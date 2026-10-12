/**
 * Wrap user-visible JSX copy in `t()`.
 *
 * ── Why this exists, and why it is the hard part ────────────────────────────
 *
 * The translation layer keys on the English source string, so a string that is
 * not inside `t()` cannot be translated at all — no catalogue entry reaches it.
 * The app has ~2,000 such strings across 160-odd components, and wrapping them
 * by hand is a week of typing that nobody would review. This does it in one
 * pass, and the result is checkable by `npm run typecheck` and a build, which
 * is a better guarantee than a human reading a 160-file diff.
 *
 * ── Why the TypeScript compiler and not a regular expression ────────────────
 *
 * Every rule below is one a regex gets wrong:
 *
 *   - `const t = useT()` has to go into the RIGHT function. A regex cannot find
 *     the enclosing component, so it either puts the hook at module scope (where
 *     `t` is not reactive, and where `useT()` is not even legal) or in an inner
 *     arrow, where the outer component's render would not re-run.
 *   - JSX text is not the source text. `<div>\n  Hello\n  world\n</div>` renders
 *     `Hello world` — newlines collapse to one space and each line is trimmed.
 *     The translation key has to be the RENDERED string, because that is what
 *     the catalogue is written against.
 *   - Whitespace at the edges is load-bearing. `<b>bold</b> and text` renders as
 *     `boldand text` the moment the leading space is dropped, and dropping it is
 *     the default thing a naive rewrite does. See `leading`/`trailing` below.
 *   - Module-scope JSX — `ACTIVITY_ITEMS` in ActivityBar, `SECTION_ICONS` in
 *     Settings — is DATA, evaluated once at import, long before a language has
 *     been read back off disk. A `t()` call there freezes the app in whatever it
 *     started as, and there is no function to put a hook in. It must be left
 *     alone, and only the tree can tell the difference.
 *
 * ── What it deliberately does not do ───────────────────────────────────────
 *
 * No string literals in `.ts` files, and none in `.tsx` outside JSX. A bare
 * `'Saved'` in a store, a toast, a title passed to `toast()`, or an error built
 * by concatenation is a judgement call each time — is it user-visible? is it
 * already inside a component that will translate it? — and a tool that guesses
 * loudly is worse than one that reports the gap. `npm run i18n:coverage` lists
 * what is left.
 *
 * Usage:
 *   node scripts/i18n/codemod.mjs                 # dry run, prints a summary
 *   node scripts/i18n/codemod.mjs --write         # applies the edits
 *   node scripts/i18n/codemod.mjs --write --only components/settings
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const SRC = join(ROOT, 'src', 'renderer', 'src')
const I18N_DIR = join(SRC, 'i18n')

const argv = process.argv.slice(2)
const WRITE = argv.includes('--write')
const ONLY = argv.includes('--only') ? argv[argv.indexOf('--only') + 1] : null

/** Attributes whose value is copy rather than configuration. */
const COPY_ATTRS = new Set([
  'title',
  'placeholder',
  'aria-label',
  'alt',
  'label',
  'desc',
  'description',
  'hint',
  'heading',
  'tooltip',
  'text',
  'emptyText',
  'emptyLabel',
  'confirmLabel',
  'cancelLabel',
  'detail',
  'summary',
  'note'
])

/**
 * JSX's own whitespace rules, which are Babel's `cleanJSXElementLiteralChild`.
 *
 * Not an approximation: the key has to be character-for-character what the
 * catalogue was written against, and what a translator sees in the running app.
 * Getting this wrong produces a key that is almost right, which is worse than
 * no key at all — the entry exists, is correct Chinese, and is never found.
 */
function normalizeJsxText(raw) {
  const lines = raw.split(/\r\n|\n|\r/)
  let lastNonEmpty = -1
  for (let i = 0; i < lines.length; i++) if (lines[i].trim()) lastNonEmpty = i
  let out = ''
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/\t/g, ' ')
    if (i !== 0) line = line.replace(/^ +/, '')
    if (i !== lines.length - 1) line = line.replace(/ +$/, '')
    if (!line) continue
    if (i !== lastNonEmpty) line += ' '
    out += line
  }
  return out
}

/**
 * Is this text copy a person reads, or is it a value?
 *
 * Deliberately conservative, and it can afford to be: a string this declines to
 * wrap still renders, in English, which is the state the app was already in. A
 * string it wrongly wraps gets a `t()` call that returns its own argument —
 * also harmless, unless the whitespace handling above was wrong, which is why
 * the risky shapes are rejected rather than guessed at.
 */
function isCopy(text) {
  if (text.length < 2 || text.length > 400) return false
  // Entities and braces are JSX syntax, not copy. `&amp;` in a title would
  // become `&` in the key and then NEVER match a catalogue entry written
  // against the rendered form.
  if (/[{}<>=&|\\]/.test(text)) return false
  if (!/[A-Za-z\u4e00-\u9fff]/.test(text)) return false
  // One token with no space: a path, a host, a shortcut, a filename, an id.
  // `Save` passes (no punctuation); `~/.ssh/config`, `Ctrl+K` and `file.txt`
  // do not.
  if (!/\s/.test(text) && /[/:._@#()[\]$~]/.test(text)) return false
  // SCREAMING_CASE constants and version strings.
  if (/^[A-Z0-9_]{5,}$/.test(text)) return false
  if (/^v?\d+(\.\d+)*$/.test(text)) return false
  return true
}

/** Single-quoted TS string literal, escaped for the source. */
function quote(text) {
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`
}

/** The outermost function containing a node — the component, not its callbacks. */
function outermostFunction(node) {
  let found = null
  for (let cur = node.parent; cur; cur = cur.parent) {
    if (
      ts.isFunctionDeclaration(cur) ||
      ts.isFunctionExpression(cur) ||
      ts.isArrowFunction(cur) ||
      ts.isMethodDeclaration(cur)
    ) {
      found = cur
    }
  }
  return found
}

/** Every name bound by a binding pattern. */
function bindingNames(name, out = []) {
  if (ts.isIdentifier(name)) out.push(name.text)
  else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
    for (const el of name.elements) {
      if (ts.isBindingElement(el)) bindingNames(el.name, out)
    }
  }
  return out
}

/**
 * The translator already in scope, or a conflict?
 *
 * `const t = useT()` is the hook this script inserts, and a file that has one
 * must be revisited rather than skipped: the files converted by hand before
 * this script existed each have a hook AND a long tail of strings nobody had
 * wrapped yet. Treating the import as "done" silently skipped exactly the
 * screens that had been partly translated — Settings.tsx most of all, which is
 * where a half-translated build is most obviously half-translated.
 *
 * Anything ELSE named `t` — a parameter, a local — is a shadowing conflict and
 * stops the file from being processed. A shadowed translator compiles and
 * renders the wrong string, and the failure looks like a missing translation
 * rather than a bug, which is the one class of defect this layer exists to
 * avoid. One such case was found by hand before this script existed:
 * `THEME_OPTIONS.map(([t, label])` in Settings.tsx.
 */
function tBinding(fn, sf) {
  const isHook = (init) =>
    init &&
    ts.isCallExpression(init) &&
    init.expression.getText(sf) === 'useT'

  for (const p of fn.parameters ?? []) {
    if (bindingNames(p.name).includes('t')) return 'conflict'
  }
  const body = fn.body
  if (!body || !ts.isBlock(body)) return null
  for (const st of body.statements) {
    if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) {
        if (bindingNames(d.name).includes('t')) return isHook(d.initializer) ? 'hook' : 'conflict'
      }
    }
    if (ts.isFunctionDeclaration(st) && st.name?.text === 't') return 'conflict'
  }
  return null
}

/**
 * Does anything between this node and its component bind `t`?
 *
 * `t` is a popular loop variable in this codebase — `toasts.map((t) => …)`,
 * `stores.map((t) => …)` — so a `t('Copy')` inside such a callback resolves to
 * the callback's parameter, not to the hook three scopes up. The failure does
 * not look like a naming problem: it compiles as far as the eye can see and
 * fails as `Type 'Toast' has no call signatures`, which reads as a broken
 * component.
 *
 * Asked PER NODE rather than per file, and that granularity is worth the extra
 * walk. A file-level rule — "this component shadows `t` somewhere, skip it" —
 * skipped 58 of 208 files, of which the type checker could only actually break
 * 5. The other 53 have a shadowed `t` in one corner and hundreds of strings
 * elsewhere that are perfectly safe to wrap; refusing them costs far more
 * coverage than the collision is worth.
 *
 * The colliding strings are left alone and the count is printed, so the gap is
 * visible rather than silent.
 */
function shadowedBetween(node, owner, sf) {
  const isFn = (n) =>
    ts.isFunctionDeclaration(n) ||
    ts.isFunctionExpression(n) ||
    ts.isArrowFunction(n) ||
    ts.isMethodDeclaration(n)
  for (let cur = node.parent; cur && cur !== owner; cur = cur.parent) {
    if (isFn(cur)) {
      for (const p of cur.parameters ?? []) {
        if (bindingNames(p.name).includes('t')) return true
      }
    }
    if (ts.isBlock(cur)) {
      for (const st of cur.statements) {
        if (!ts.isVariableStatement(st)) continue
        for (const d of st.declarationList.declarations) {
          if (bindingNames(d.name).includes('t')) return true
        }
      }
    }
  }
  return false
}

function i18nImportPath(file) {
  let rel = relative(dirname(file), I18N_DIR).split(sep).join('/')
  if (!rel.startsWith('.')) rel = `./${rel}`
  return rel
}

function processFile(file) {
  const source = readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX)
  const edits = []
  const owners = new Set()
  const skipped = []
  let shadowed = 0

  const replace = (node, text) => edits.push({ start: node.getStart(sf), end: node.getEnd(), text })

  const visit = (node) => {
    // ── JSX text between tags.
    if (ts.isJsxText(node)) {
      const rendered = normalizeJsxText(node.getText(sf))
      const core = rendered.trim()
      if (!isCopy(core)) return
      const owner = outermostFunction(node)
      if (!owner) {
        skipped.push(`module-scope JSX: "${core.slice(0, 40)}"`)
        return
      }
      if (shadowedBetween(node, owner, sf)) {
        shadowed += 1
        return
      }
      // The edges are preserved explicitly rather than folded into the key, so
      // the catalogue holds ` and text` without a leading space, and so a
      // translator cannot accidentally delete it.
      const parts = []
      if (rendered !== rendered.trimStart()) parts.push("{' '}")
      parts.push(`{t(${quote(core)})}`)
      if (rendered !== rendered.trimEnd()) parts.push("{' '}")
      replace(node, parts.join(''))
      owners.add(owner)
      return
    }

    // ── `title="Copy"` and friends.
    if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const name = node.name.getText(sf)
      if (COPY_ATTRS.has(name) && isCopy(node.initializer.text)) {
        const owner = outermostFunction(node)
        if (!owner) {
          skipped.push(`module-scope attribute ${name}`)
          return
        }
        if (shadowedBetween(node, owner, sf)) {
          shadowed += 1
          return
        }
        replace(node.initializer, `{t(${quote(node.initializer.text)})}`)
        owners.add(owner)
      }
      return
    }

    ts.forEachChild(node, visit)
  }
  visit(sf)

  if (edits.length === 0) return { file, skipped: skipped.length ? 'no transformable copy' : null, shadowed }

  // Only a genuine conflict stops the whole file: a parameter or local named
  // `t` at the component's own top level means there is nowhere to put the
  // hook. Everything narrower is handled per node above.
  const conflicted = [...owners].filter((o) => tBinding(o, sf) === 'conflict')
  if (conflicted.length > 0) {
    return {
      file,
      skipped: `component already binds \`t\` (${conflicted.length})`,
      count: edits.length,
      shadowed
    }
  }

  // ── Insert `const t = useT()` into every owning component that lacks one.
  for (const owner of owners) {
    if (tBinding(owner, sf) === 'hook') continue
    const body = owner.body
    if (!body) continue
    if (ts.isBlock(body)) {
      edits.push({
        start: body.getStart(sf) + 1,
        end: body.getStart(sf) + 1,
        text: '\n  const t = useT()'
      })
    } else {
      // An expression-bodied arrow: `() => <div>…</div>`. Wrap it so there is
      // somewhere to put the hook, and keep the value by returning it.
      edits.push({ start: body.getStart(sf), end: body.getStart(sf), text: '{\n  const t = useT()\n  return (' })
      edits.push({ start: body.getEnd(), end: body.getEnd(), text: ')\n}' })
    }
  }

  // ── And the import, unless the file already has it.
  const hasImport = /from '[^']*\/i18n'/.test(source)
  if (!hasImport) {
    const imports = []
    for (const st of sf.statements) {
      if (ts.isImportDeclaration(st)) imports.push(st)
    }
    const anchor = imports.length
      ? imports[imports.length - 1].getEnd()
      : sf.statements.length
        ? sf.statements[0].getStart(sf)
        : 0
    edits.push({
      start: anchor,
      end: anchor,
      text: `\nimport { useT } from '${i18nImportPath(file)}'`
    })
  }

  // Descending, so earlier offsets stay valid as later ones are rewritten.
  edits.sort((a, b) => b.start - a.start || b.end - a.end)
  let out = source
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end)

  return { file, count: edits.length - owners.size - (hasImport ? 0 : 1), owners: owners.size, out, skipped, shadowed }
}

// ── Walk
const targets = []
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (entry !== 'node_modules') walk(full)
    } else if (entry.endsWith('.tsx') && !full.startsWith(I18N_DIR)) {
      targets.push(full)
    }
  }
}
walk(SRC)

const results = []
for (const file of targets) {
  if (ONLY && !file.split(sep).join('/').includes(ONLY)) continue
  try {
    results.push(processFile(file))
  } catch (err) {
    results.push({ file, error: String(err && err.message) })
  }
}

const changed = results.filter((r) => r.out)
const skipped = results.filter((r) => r.skipped && !r.out && r.count !== undefined)
const errors = results.filter((r) => r.error)
const callSites = changed.reduce((n, r) => n + (r.count ?? 0), 0)
const shadowedTotal = results.reduce((n, r) => n + (r.shadowed ?? 0), 0)

console.log('i18n codemod%s', WRITE ? ' — WRITING' : ' — dry run (pass --write to apply)')
console.log('  .tsx scanned        : %d', targets.length)
console.log('  files changed       : %d', changed.length)
console.log('  strings wrapped     : ~%d', callSites)
console.log('  components hooked   : %d', changed.reduce((n, r) => n + (r.owners ?? 0), 0))
if (shadowedTotal) {
  console.log('  left alone          : %d string(s) sit inside a scope that binds `t`', shadowedTotal)
}
console.log('')

if (errors.length) {
  console.log('PARSE ERRORS — %d', errors.length)
  for (const r of errors) console.log('  %s\n      %s', relative(ROOT, r.file), r.error)
  console.log('')
}
if (skipped.length) {
  console.log('SKIPPED — %d (needs a hand)', skipped.length)
  for (const r of skipped.slice(0, 40)) {
    console.log('  %s\n      %s', relative(ROOT, r.file), r.skipped)
  }
  if (skipped.length > 40) console.log('  … and %d more', skipped.length - 40)
  console.log('')
}

if (WRITE) {
  for (const r of changed) writeFileSync(r.file, r.out, 'utf8')
  console.log('written.')
} else {
  console.log('Largest files, as a sanity check on the shape:')
  for (const r of changed.sort((a, b) => (b.count ?? 0) - (a.count ?? 0)).slice(0, 12)) {
    console.log(
      '  %s strings, %s components  %s',
      String(r.count).padStart(4),
      String(r.owners).padStart(2),
      relative(ROOT, r.file)
    )
  }
}

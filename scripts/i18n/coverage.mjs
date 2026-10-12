/**
 * Translation coverage.
 *
 * Reports both directions of the one failure mode this scheme has:
 *
 *   1. WIRED but UNTRANSLATED — a `t('…')` call whose string is not in the
 *      catalogue. Not an error: it renders the English source, which is the
 *      whole reason English-as-key was chosen. It is a worklist.
 *   2. TRANSLATED but UNWIRED — an entry in the catalogue that nothing asks for.
 *      This one IS a defect, and it is the reason this script exists at all:
 *      with the English text as the key, rewording a label silently orphans its
 *      translation. Nothing breaks, nothing warns, and a screen that was Chinese
 *      last week is English today. Orphans are how you find out.
 *
 * Parsed with the TypeScript compiler rather than with a regular expression,
 * because the two things a regex gets wrong here are both common in this
 * codebase:
 *
 *   - `t(` calls that wrap across lines, which the formatter produces whenever
 *     the sentence is long — and these are the messages most worth translating.
 *   - The word `t(` inside a comment or a string, of which there are many: the
 *     i18n module's own documentation contains three, and reading those as call
 *     sites would report `common.save` as a gap forever.
 *
 * ── `t(expression)`, and why this script has an allowlist ───────────────────
 *
 * Not every call site is checkable. `t(it.label)` and `t(SECTION_META[id].label)`
 * are real and deliberate — they are how a whole list of destinations gets
 * translated without a second copy of every name — but the string being
 * translated is only known at runtime, so no static tool can say whether it has
 * a translation.
 *
 * Left alone, that produced a report that was wrong in both directions: every
 * name reached through a registry was listed as untranslated AND its entry was
 * listed as an orphan, which is exactly the pair of false alarms that gets a
 * coverage tool switched off in its first week.
 *
 * So a string counts as reachable if it is any of:
 *
 *   - the argument of a literal `t('…')` call, anywhere;
 *   - a string literal in a file that ALSO contains a `t(expression)` call —
 *     the registry and the call that reads it are usually in the same file, and
 *     this covers ActivityBar, Sidebar, Settings and UpdatePanel without
 *     naming any of them;
 *   - a string literal in a file on DYNAMIC_SOURCES below.
 *
 * The third exists for the one case the second cannot see: a registry in a file
 * that never calls `t` itself, because the component that renders it lives
 * somewhere else. That is store/nav.ts, whose SETTINGS_SECTION_LABELS is
 * translated in Settings.tsx and again in CommandPalette.tsx.
 *
 * The trade is stated plainly: the second and third rules over-count what is
 * reachable, so a genuine orphan inside those files would not be reported. That
 * is the direction to fail in. A tool that reports a gap which is not there
 * teaches people to ignore it; a tool that misses one leaves a screen in
 * English, which is the state they were already in.
 *
 * Run: npm run i18n:coverage
 *      npm run i18n:coverage -- --strict   (non-zero exit if anything is listed)
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const SRC = join(ROOT, 'src')
const CATALOGUE = join(SRC, 'renderer', 'src', 'i18n', 'locales', 'zh-CN.ts')
const SKIP_DIRS = new Set(['node_modules', 'dist', 'out', '.git', 'build'])

/**
 * Registries that are translated elsewhere.
 *
 * Files whose string literals are all treated as reachable, because a component
 * in another file reads them through `t(expression)` and this script has no way
 * to follow that. Add a file here when its strings are consumed that way.
 */
const DYNAMIC_SOURCES = [
  // SETTINGS_SECTION_LABELS and AI_SECTION_LABELS: read by Settings.tsx and
  // CommandPalette.tsx, never by this file.
  'src/renderer/src/store/nav.ts',
  // LABEL and the alert detail sentences. Read by StatusBar.tsx as
  // `t(LABEL[a.kind])` and `t(a.detail)` — a dynamic call site, but in a file
  // that does not hold the strings, so the rule above cannot reach them.
  'src/renderer/src/store/alerts.ts',
  // `warning.label` and `warning.detail`, read the same way by StatusBar.
  'src/renderer/src/store/fleetStatus.ts'
]

/** Every .ts/.tsx under `dir`, minus the ones that are not ours. */
function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) out.push(full)
  }
  return out
}

/**
 * The catalogue, read out of the object literal itself.
 *
 * Not by importing it: it is TypeScript, and the alternative to parsing it here
 * is adding a build step to a check whose entire value is that it can be run at
 * any moment without one.
 */
function loadCatalogue() {
  const sf = ts.createSourceFile(
    CATALOGUE,
    readFileSync(CATALOGUE, 'utf8'),
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TS
  )
  const entries = new Map()
  const visit = (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(sf) === 'zhCN' &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const prop of node.initializer.properties) {
        if (!ts.isPropertyAssignment(prop)) continue
        /**
         * Identifier keys are legal and used: `Appearance: '外观'` needs no
         * quotes, so it has none — the file quotes only where TypeScript
         * requires it, which is the same rule the rest of this repo follows for
         * object keys. Reading only string-literal names silently dropped every
         * one-word entry, which is most of the section labels and every activity
         * name, and reported them all as untranslated. A coverage tool that is
         * wrong about the commonest case is worse than no coverage tool.
         */
        const name = ts.isIdentifier(prop.name)
          ? prop.name.text
          : ts.isStringLiteralLike(prop.name)
            ? prop.name.text
            : null
        if (name === null) continue
        const value = prop.initializer
        const text =
          ts.isStringLiteralLike(value) || ts.isNoSubstitutionTemplateLiteral(value)
            ? value.text
            : null
        entries.set(name, {
          value: text,
          line: sf.getLineAndCharacterOfPosition(prop.getStart(sf)).line + 1
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return entries
}

/** A string literal value, or null for anything computed. */
function literalOf(node) {
  if (node && (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node))) {
    return node.text
  }
  return null
}

/**
 * Walk the tree once, collecting literal call sites, dynamic call sites, and
 * every string literal per file.
 *
 * One pass rather than three: this runs over ~630 files and the parse is the
 * expensive part.
 */
function scan() {
  const literalSites = new Map()
  const dynamicSites = []
  const literalsByFile = new Map()

  for (const file of walk(SRC)) {
    const where = relative(ROOT, file).split(sep).join('/')
    const sf = ts.createSourceFile(
      file,
      readFileSync(file, 'utf8'),
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TSX
    )
    const lits = new Set()

    const visit = (node) => {
      if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        lits.add(node.text)
      }
      if (ts.isCallExpression(node) && node.expression.getText(sf) === 't' && node.arguments.length) {
        const arg = node.arguments[0]
        const line = sf.getLineAndCharacterOfPosition(arg.getStart(sf)).line + 1
        const text = literalOf(arg)
        if (text) {
          const list = literalSites.get(text) ?? []
          list.push(`${where}:${line}`)
          literalSites.set(text, list)
        } else {
          dynamicSites.push(`${where}:${line}`)
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(sf)
    literalsByFile.set(where, lits)
  }

  return { literalSites, dynamicSites, literalsByFile }
}

const catalogue = loadCatalogue()
const { literalSites, dynamicSites, literalsByFile } = scan()

// Files that translate a registry: everything in them is reachable.
const dynamicFiles = new Set(
  [...literalsByFile.keys()].filter((f) => dynamicSites.some((s) => s.startsWith(f + ':')))
)

const reachable = new Set(literalSites.keys())
for (const [file, lits] of literalsByFile) {
  if (dynamicFiles.has(file) || DYNAMIC_SOURCES.includes(file)) {
    for (const lit of lits) reachable.add(lit)
  }
}

const untranslated = [...literalSites.keys()].filter((k) => !catalogue.has(k)).sort()
const orphans = [...catalogue.keys()].filter((k) => !reachable.has(k)).sort()

const pct =
  literalSites.size === 0
    ? 100
    : Math.round(((literalSites.size - untranslated.length) / literalSites.size) * 100)

console.log('i18n coverage')
console.log('  literal call sites (unique strings) : %d', literalSites.size)
console.log('  dynamic call sites t(expression)    : %d  (not statically checkable)', dynamicSites.length)
console.log('  files treated as registries         : %d', dynamicFiles.size + DYNAMIC_SOURCES.length)
console.log('  catalogue entries                   : %d', catalogue.size)
console.log('  translated                          : %d  (%d%% of literal call sites)', literalSites.size - untranslated.length, pct)
console.log('')

if (untranslated.length) {
  console.log('WIRED BUT UNTRANSLATED — %d. These render English until entries are added.', untranslated.length)
  for (const key of untranslated) console.log('  %s\n      %s', JSON.stringify(key), literalSites.get(key)[0])
  console.log('')
}

if (orphans.length) {
  console.log('TRANSLATED BUT UNWIRED — %d. A source string changed; the entry is now dead.', orphans.length)
  for (const key of orphans) {
    console.log('  %s   (zh-CN.ts:%d)', JSON.stringify(key), catalogue.get(key).line)
  }
  console.log('')
}

// Fail-closed only when asked. A worklist that breaks the build on day one is a
// worklist everybody deletes; the CI job that wants it strict can pass --strict.
if (process.argv.includes('--strict') && (untranslated.length || orphans.length)) {
  process.exitCode = 1
}

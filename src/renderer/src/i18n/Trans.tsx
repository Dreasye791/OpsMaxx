import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { PLACEHOLDER, useT } from './index'
import type { Vars } from './index'

/**
 * A sentence with markup inside it.
 *
 * ── The problem ─────────────────────────────────────────────────────────────
 *
 * Step 1 of the bug report reads
 *
 *     A report without a recording says what this install <em>is</em> — …
 *
 * and that sentence cannot go into the catalogue as it stands, because it is
 * not one string. Splitting it into the fragments around the `<em>` — which is
 * what the code did — gives a translation that cannot reorder them, so the
 * sentence's own grammar is fixed to English. In a language whose verb lands
 * at the end, the translated fragments come out in the wrong order and the
 * result is not a sentence.
 *
 * ── The shape ───────────────────────────────────────────────────────────────
 *
 * The sentence is ONE key, with the markup written as a named slot:
 *
 *     <Trans
 *       source="A report without a recording says what this install {em} — …"
 *       components={{ em: <em>{t('is')}</em> }}
 *     />
 *
 * The translator puts `{em}` wherever their grammar wants the emphasis, and
 * what goes in the slot is the caller's business — an element here, a word in
 * italics there, a `<code>` path somewhere else. Inline text that has to be
 * translated is still translated; it is positioned by the sentence instead of
 * by the JSX around it.
 *
 * ── Why the English source is still the key ─────────────────────────────────
 *
 * Same contract as `t`: a missing entry renders the source with its slots
 * filled in, so an untranslated screen degrades to English rather than to
 * `trans.bug.step1`. That is also what makes the English assertion in
 * tests/trans.test.tsx meaningful — it renders through the same path.
 *
 * ── What a caller gives up ──────────────────────────────────────────────────
 *
 * A slot is a node, so it cannot be a `{name}` value substituted into a string
 * the translator reorders word by word. A sentence needing BOTH — markup and a
 * value inside it — passes the value in `values` and the markup in
 * `components`, and the slot's own text comes from the caller (which is why
 * `{em}` above is filled with `t('is')` rather than naming the word inline).
 */
export function Trans({
  source,
  values,
  components
}: {
  /** The source sentence, with `{name}` where an element goes. */
  source: string
  /** Plain-text `{name}` substitutions, exactly as `t` takes them. */
  values?: Vars
  /** `{name}` substitutions that are elements. */
  components?: Record<string, ReactNode>
}): React.JSX.Element {
  const t = useT()
  // A capturing group makes `split` alternate text and slot names, starting and
  // ending with text: 'a {em} b' -> ['a ', 'em', ' b']. An empty leading or
  // trailing piece is normal and renders as nothing.
  const parts = t(source, values).split(PLACEHOLDER)
  return (
    <>
      {parts.map((part, i) => {
        // Even indices are text; odd ones are the slot names.
        if (i % 2 === 0) return part
        const node = components?.[part]
        // A slot nobody filled keeps its marker, which is the choice
        // `interpolate` makes for a missing var: a visible `{strong}` is a bug
        // somebody can report, while dropping the slot deletes a word and says
        // nothing at all.
        if (node === undefined) return `{${part}}`
        // Keyed on the Fragment rather than cloned onto the child: the child is
        // the caller's element and has not agreed to be re-keyed.
        return <Fragment key={`slot-${i}`}>{node}</Fragment>
      })}
    </>
  )
}

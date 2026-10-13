/**
 * The translation layer.
 *
 * ── Why the English string is the key ───────────────────────────────────────
 *
 * `t('Save')` rather than `t('common.save')`.
 *
 * The alternative was tried on paper first and lost on two counts, both of them
 * things that only show up once the catalogue is a few thousand entries deep:
 *
 *   1. A missing entry has to mean something. With symbolic keys a miss renders
 *      `common.save` on the button — a screen that looks broken and says nothing.
 *      With the English source as the key, a miss renders `Save`, which is the
 *      correct English and merely an untranslated Chinese screen. Degrading to
 *      the source language is the only failure mode this layer is allowed to
 *      have, because it is the one a user can keep working through.
 *
 *   2. Which makes partial coverage shippable. The app has one catalogue today
 *      and can gain the rest one screen at a time — a half-finished translation
 *      is a half-Chinese app, not a broken one. This is what lets the codemod in
 *      scripts/i18n run across the whole renderer: it can rewrite a call site
 *      before anybody has written the translation for it.
 *
 * The cost is real and worth naming: rewording an English string orphans its
 * translation. `npm run i18n:coverage` reports those instead of hiding them —
 * it diffs the catalogue against the `t()` calls the source actually contains,
 * so an orphan shows up as an entry nobody asks for rather than as a screen
 * that quietly went back to English.
 *
 * ── Where the current language actually lives ───────────────────────────────
 *
 * The persisted choice is `settings.language` in the app store, because it is a
 * user preference and belongs in the same file as the theme. This module keeps
 * only a mirrored copy, because `t` has to work OUTSIDE React: store/toast.ts
 * builds messages, and event handlers and the clipboard code translate strings
 * with no component in sight. A hook-only design would have forced every one of
 * those through a provider.
 *
 * So `LocaleBridge` (see ./LocaleBridge.tsx) is the single writer: it watches
 * the store, calls `setLanguagePreference` here, tells main, and sets
 * `<html lang>`. Nothing else assigns module state, which is what keeps the two
 * copies from drifting.
 */

import { useSyncExternalStore } from 'react'
import { zhCN } from './locales/zh-CN'

/** A language this build can actually render. */
export type LocaleCode = 'en' | 'zh-CN'

/**
 * What the user picked, which is not the same thing as what they get.
 *
 * `'system'` is a real choice and the default: someone running a Chinese
 * desktop expects a Chinese app without going looking for a switch, and someone
 * who set their desktop to English does not want a Chinese app because of where
 * the build was downloaded. Only the explicit options pin a language.
 */
export type LanguagePreference = 'system' | 'en' | 'zh-CN'

/**
 * Every language, for the picker.
 *
 * `label` is in the CURRENT interface language (so it reads "Chinese" to an
 * English speaker) and `native` in its own (so it reads 简体中文 to a Chinese
 * speaker). Both, because a picker is the one screen where someone who cannot
 * read the current language still has to find their way out — the same reason
 * the options are listed in their own language first in every other app.
 */
export const LANGUAGES: { id: LanguagePreference; label: string; native: string }[] = [
  { id: 'system', label: 'Follow system language', native: '跟随系统' },
  { id: 'en', label: 'English', native: 'English' },
  { id: 'zh-CN', label: 'Chinese (Simplified)', native: '简体中文' }
]

/** The catalogues this build ships. `en` is the source language: see the header. */
const CATALOGUES: Partial<Record<LocaleCode, Record<string, string>>> = {
  'zh-CN': zhCN
}

/** Every `zh` tag lands on Simplified. See `resolveLocale` for why one Chinese is enough. */
const ZH = /^zh\b/i

/**
 * The language a code gets for a `zh-*` tag.
 *
 * Simplified for `zh-Hant`, `zh-TW` and `zh-HK` too, which is a deliberate
 * simplification rather than an oversight: this build ships one Chinese
 * catalogue, and of the two ways to be wrong — English to somebody who reads
 * Chinese, or Simplified to somebody who reads Traditional — the first is not
 * usable and the second is readable, if not what they would have picked. A
 * `zh-TW` catalogue keyed off the same ids is the fix, and nothing here has to
 * move for it: CATALOGUES takes a second entry and LANGUAGES a fourth option.
 */
export function resolveLocale(preference: LanguagePreference): LocaleCode {
  if (preference === 'en' || preference === 'zh-CN') return preference
  return systemLocale()
}

/**
 * What the OS asks for, best-effort.
 *
 * `navigator.languages` first because it is the ordered preference list and the
 * only one that lets someone whose second language is Chinese get Chinese;
 * `navigator.language` is the single-value fallback. Outside Electron — the
 * vitest environment, and any harness that has no navigator at all — the answer
 * is English rather than a throw, because a translation layer that can take down
 * the renderer is worse than one that renders English.
 */
export function systemLocale(): LocaleCode {
  const nav = typeof navigator === 'undefined' ? undefined : navigator
  if (!nav) return 'en'
  const tags = [nav.language, ...(nav.languages ?? [])].filter(Boolean) as string[]
  for (const tag of tags) if (ZH.test(tag)) return 'zh-CN'
  return 'en'
}

// ── Module state ────────────────────────────────────────────────────────────

let preference: LanguagePreference = 'system'
let locale: LocaleCode = systemLocale()

/**
 * A counter, not the locale itself.
 *
 * `useSyncExternalStore` compares snapshots with `Object.is`, and `getLocale`
 * returning the same string across an unrelated re-render is exactly what keeps
 * it from looping. Bumping a number when the language moves is the smallest
 * thing that changes on a real change and never on a fake one.
 */
let version = 0
const listeners = new Set<() => void>()

function emit(): void {
  version += 1
  for (const l of Array.from(listeners)) l()
}

export function getLocale(): LocaleCode {
  return locale
}

export function getLanguagePreference(): LanguagePreference {
  return preference
}

export function subscribeLocale(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getVersion(): number {
  return version
}

/**
 * Adopt a preference. The one place module state changes.
 *
 * Returns true when the resolved locale actually moved, so the caller can skip
 * the IPC round trip and the `<html lang>` write on a preference change that
 * lands on the same language — `'system'` to `'en'` on an English machine is a
 * real thing somebody does, and it should cost nothing.
 */
export function setLanguagePreference(next: LanguagePreference): boolean {
  const resolved = resolveLocale(next)
  const changed = resolved !== locale
  preference = next
  locale = resolved
  if (changed) emit()
  return changed
}

// ── Translating ─────────────────────────────────────────────────────────────

export type Vars = Record<string, string | number>
export type TFunction = (source: string, vars?: Vars) => string

/**
 * What a `{name}` slot looks like.
 *
 * Exported because `Trans` (./Trans.tsx) splits a template on the same boundary
 * this substitutes on. Two copies of this pattern that disagreed by a character
 * would send a slot down one path and not the other, and the symptom would be a
 * stray `{strong}` in the middle of a translated sentence.
 */
export const PLACEHOLDER = /\{(\w+)\}/g

/**
 * `{name}` substitution.
 *
 * A var whose name is missing leaves its placeholder alone rather than
 * substituting `undefined`: a literal `{name}` on screen is a bug report
 * somebody can act on, and `undefined` in the middle of a sentence is one that
 * gets scrolled past. Substitution is on the TRANSLATED string, so a catalogue
 * entry is free to move `{name}` to wherever the target grammar wants it —
 * which is the whole reason placeholders exist instead of concatenation.
 *
 * Exported because a module that COMPOSES a sentence has to substitute at
 * composition time, and it needs the same rule rather than a second copy of
 * it. See `identity` in components/ai/accessGroupSummary.ts: that default has
 * to reproduce exactly what this does on a catalogue miss, or the two paths
 * through the same sentence disagree.
 */
export function interpolate(text: string, vars?: Vars): string {
  if (!vars) return text
  return text.replace(PLACEHOLDER, (whole, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : whole
  )
}

/**
 * Untranslated sources seen since launch, dev only.
 *
 * Not a log line per miss: a screen nobody has translated yet misses on every
 * render of every one of its strings, and a console that scrolls is a console
 * nobody reads. A Set can be looked at once, from `window.__i18nMissing()`,
 * after walking the app — which is how the coverage script's worklist was
 * actually built.
 */
const missing = new Set<string>()

export const t: TFunction = (source, vars) => {
  if (!source) return source
  const table = CATALOGUES[locale]
  const hit = table?.[source]
  if (hit === undefined) {
    if (import.meta.env.DEV && locale !== 'en') missing.add(source)
    return interpolate(source, vars)
  }
  return interpolate(hit, vars)
}

if (import.meta.env.DEV) {
  ;(globalThis as unknown as Record<string, unknown>).__i18nMissing = () => Array.from(missing)
}

/**
 * The locale `Intl` should format with.
 *
 * Separate from `getLocale` because the two want different tags: translation
 * keys off the catalogue we ship, while `toLocaleString` wants a full BCP-47
 * tag. Without this the app would render translated dates as `10/12/2026` in
 * the middle of a Chinese sentence.
 */
export function intlLocale(): string {
  return locale === 'zh-CN' ? 'zh-CN' : 'en-US'
}

// ── React ───────────────────────────────────────────────────────────────────

/** Re-renders on a language change and hands back `t`. For components. */
export function useT(): TFunction {
  useSyncExternalStore(subscribeLocale, getVersion, getVersion)
  return t
}

/** For the rare component that needs the code itself, not the strings. */
export function useLocale(): LocaleCode {
  return useSyncExternalStore(subscribeLocale, getLocale, getLocale)
}

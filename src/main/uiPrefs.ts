/**
 * The interface preferences main has to know before a renderer exists.
 *
 * ── Why this is its own file ────────────────────────────────────────────────
 *
 * The obvious home for the language is `settings.language` in
 * `opsmaxx-data.json`, which is where it IS stored, and which the renderer owns
 * and writes wholesale every 400ms after any change.
 *
 * Main still cannot read it at the moment it needs to. Chromium picks its
 * `locales/*.pak` bundle from the `--lang` command-line switch, and that switch
 * has to be appended before `app.whenReady()` — which is several hundred
 * milliseconds and a lot of module scope earlier than the first
 * `data:load`. Reading the renderer's blob that early would mean
 * re-implementing its decryption path at a point where the code that owns that
 * path has not been given the userData root yet, and getting it subtly wrong
 * would be silent: the app would simply come up in the wrong language.
 *
 * So main keeps one small file of its own, next to `opsmaxx-processes.json` and
 * `opsmaxx-credproxy.json`, which are there for the same class of reason. The
 * renderer writes it through `i18n:set` on every language change, so it is
 * already correct on disk by the time the next launch needs it.
 *
 * ── What the switch actually buys ───────────────────────────────────────────
 *
 * More than the two menu labels in `menuLabel` below, which is the point. Once
 * Chromium's locale is Chinese, everything Electron renders from its own
 * resources follows:
 *
 *   - every `role:` menu item, which is why `installMenu` names no labels for
 *     undo, copy or paste and should keep not naming them;
 *   - the text field context menu (cut/copy/paste on a terminal selection);
 *   - the find bar and the spelling panel.
 *
 * That is the same `locales/zh-CN.pak` this app was audited for earlier: it has
 * been on disk the whole time, 571 KB of it, and until now nothing ever asked
 * for it because the switch was never appended.
 */

import { app } from 'electron'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

/** Mirrors `LanguagePreference` in the renderer. See src/renderer/src/i18n. */
export type LanguagePreference = 'system' | 'en' | 'zh-CN'

/** A concrete language, never `'system'`. */
export type LocaleCode = 'en' | 'zh-CN'

interface UiPrefs {
  language?: LanguagePreference
}

const FILE = 'opsmaxx-ui-prefs.json'

let cache: UiPrefs | null = null

function path(): string {
  return join(app.getPath('userData'), FILE)
}

/**
 * Cached, because `applyLanguageSwitch` and the first menu build both want this
 * before anything has had a chance to write it, and a second read of a file we
 * just parsed buys nothing.
 */
function read(): UiPrefs {
  if (cache) return cache
  try {
    const parsed: unknown = JSON.parse(readFileSync(path(), 'utf8'))
    cache = parsed && typeof parsed === 'object' ? (parsed as UiPrefs) : {}
  } catch {
    // Absent on a fresh install, and unreadable is the same answer as absent:
    // 'system'. Never throws — this runs on the launch path.
    cache = {}
  }
  return cache
}

export function rememberedLanguage(): LanguagePreference {
  const value = read().language
  return value === 'en' || value === 'zh-CN' ? value : 'system'
}

export function rememberLanguage(preference: LanguagePreference): void {
  const next: UiPrefs = { ...read(), language: preference }
  cache = next
  try {
    writeFileSync(path(), JSON.stringify(next, null, 2), 'utf8')
  } catch {
    // A read-only profile costs the NEXT launch its language, not this one:
    // the in-memory `resolved` below still drives the menu until the app exits.
  }
}

/**
 * What the current session is rendering in.
 *
 * `app.getLocale()` is the answer for `'system'`, and it is the right one to ask
 * rather than re-reading the environment: it is already the resolved,
 * Chromium-agreed tag, and asking a second source is how the menu and the
 * content end up in different languages on a machine with an unusual
 * `LANG`/`LC_ALL` combination.
 */
let resolved: LocaleCode | null = null

export function resolvedLocale(): LocaleCode {
  if (resolved) return resolved
  const preference = rememberedLanguage()
  if (preference !== 'system') {
    resolved = preference
    return resolved
  }
  resolved = /^zh\b/i.test(app.getLocale()) ? 'zh-CN' : 'en'
  return resolved
}

/** Called from `i18n:set`. Keeps the menu in step with a change made live. */
export function setResolvedLocale(locale: LocaleCode): void {
  resolved = locale
}

/**
 * Append `--lang`, once, before ready.
 *
 * Called explicitly from index.ts rather than on import, because
 * `app.getPath('userData')` is only the right directory after portable.ts has
 * had its say — index.ts's first line imports it for exactly that reason — and
 * an import-time side effect here would depend on a module ordering that no
 * one reading this file could see.
 *
 * `'system'` appends nothing at all. Chromium already defaults to the OS
 * language, and passing `app.getLocale()` back would be a no-op that looks like
 * a decision.
 */
export function applyLanguageSwitch(): void {
  const preference = rememberedLanguage()
  if (preference === 'system') return
  app.commandLine.appendSwitch('lang', preference)
}

/**
 * The menu labels Electron will not translate for us.
 *
 * Only two, and they are the only two because everything else in
 * `installMenu` is a `role:` — whose label comes out of the .pak bundle named
 * above. A label written here for `undo` would OVERRIDE that translation with
 * a hardcoded English word, which is the one way to make this worse than
 * leaving it alone.
 *
 * `Edit` and `View` have no role to borrow: Electron has no `role: 'edit'`.
 */
const MENU_LABELS: Record<LocaleCode, { edit: string; view: string }> = {
  en: { edit: 'Edit', view: 'View' },
  'zh-CN': { edit: '编辑', view: '视图' }
}

export function menuLabel(key: 'edit' | 'view'): string {
  return MENU_LABELS[resolvedLocale()][key]
}

/**
 * The one writer of the interface language.
 *
 * Renders nothing; exists to hold the three effects a language change has that
 * no component can do for itself.
 *
 * ── Mounted at the root, above App ──────────────────────────────────────────
 *
 * In main.tsx beside `<App />` rather than inside it. App has an early return
 * for a revoked device — the screen that says this machine was removed from its
 * estate — and a translation layer mounted inside App would come up in English
 * on precisely the screen where the user most needs to understand what
 * happened. Translating that screen is not optional politeness.
 *
 * ── Why the store is the source and this is not ─────────────────────────────
 *
 * `settings.language` is the persisted choice and lives in the app store, where
 * it saves with the theme and survives a restart. This component only mirrors
 * it into `i18n/index.ts` (so `t` works outside React) and into the two places
 * that are not this process at all. Two copies, one writer — see the header of
 * i18n/index.ts for why the mirror has to exist.
 */

import { useEffect } from 'react'
import { useApp } from '../store/app'
import { getLocale, setLanguagePreference, type LanguagePreference } from './index'

export function LocaleBridge(): null {
  // Absent in saves written before the setting existed, which reads as the
  // default. `?? 'system'` rather than a fallback inside the store: DEFAULT_
  // SETTINGS already supplies it on every load path that goes through
  // replaceAll, and this only covers a render that beats the load.
  const preference: LanguagePreference = useApp((s) => s.settings.language) ?? 'system'

  useEffect(() => {
    setLanguagePreference(preference)
    const locale = getLocale()

    // `<html lang>` and not only the strings. It is what tells a screen reader
    // which voice to use, what lets the UA pick CJK line-breaking and font
    // fallback for a paragraph that is now mostly Han characters, and what
    // makes `:lang(zh)` in the stylesheet match at all — the last of which is
    // how global.css tightens the letter-spacing on Chinese labels, since 12px
    // Han text set with the Latin tracking the app uses everywhere else reads
    // as though the words are spaced apart.
    document.documentElement.setAttribute('lang', locale)

    // Main owns the application menu and the Chromium locale; neither can be
    // reached from here. Sent on every mount and not only on a change: on a
    // `'system'` preference this process and main can legitimately disagree —
    // `navigator.language` and `app.getLocale()` are answered by different
    // layers of the same OS, and they differ on a machine with an unusual
    // LC_ALL — and the first sync is what settles it.
    void window.opsmaxx?.i18n?.set(locale, preference)
  }, [preference])

  return null
}

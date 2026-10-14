/**
 * The language picker.
 *
 * ── Why the options are named in their own language ─────────────────────────
 *
 * "简体中文", not "Chinese (Simplified)".
 *
 * Every other segment in Settings labels its options in the interface language,
 * and this one deliberately does not. The rule that makes a picker work is that
 * the person who needs it may not be able to read the language it is currently
 * in — a screen that offers "中文" to somebody who is looking at a Chinese app
 * they cannot read is the one control where the current language is the wrong
 * language. `Follow system` is translated because there is no way to write it
 * that every reader recognises, and it is the option that needs no reading: it
 * is where the app already is.
 *
 * ── What it says about the system ───────────────────────────────────────────
 *
 * The resolved language is stated under the segment when the preference is
 * `'system'`. Without it, "Follow system" is a promise with no receipt: someone
 * on a Chinese desktop who still sees English has no way to tell whether the
 * setting is broken or whether their desktop is not set up the way they think
 * it is. One line settles it, and it is the same line whether the answer is
 * Chinese or English.
 *
 * ── Why there is a coverage note ────────────────────────────────────────────
 *
 * Because the alternative is a bug report. This build translates the interface
 * shell, Settings and the common surfaces; the deeper panels are still English
 * and fall back to it by design — see the header of i18n/index.ts. Saying so on
 * the page that switches the language turns "the translation is broken" into
 * "the translation is unfinished", which is the true one and the one somebody
 * can decide whether to live with.
 */

import { clsx } from '../../lib/format'
import { useApp } from '../../store/app'
import { LANGUAGES, systemLocale, useLocale, useT, type LanguagePreference } from '../../i18n'

export function LanguagePanel(): React.JSX.Element {
  const t = useT()
  const locale = useLocale()
  const preference: LanguagePreference = useApp((s) => s.settings.language) ?? 'system'
  const setSettings = useApp((s) => s.setSettings)

  // `useLocale` for the resolved code and `systemLocale()` for the raw tag,
  // because the two answer different questions and the copy below depends on
  // the difference: the first is the catalogue actually in use, the second is
  // what the OS asked for. On `'system'` they are the same by construction, so
  // only the second one is worth printing — but only when they agree is it
  // honest to call it "your system".
  const systemSays = systemLocale()
  const followsSystem = preference === 'system'

  return (
    <div className="settings-section">
      <h2>{t('Language')}</h2>
      <div className="sub">{t('What language OpsMaxx is shown in.')}</div>

      <div className="setting-row">
        <div className="s-info">
          <div className="s-title">{t('Interface language')}</div>
          <div className="s-desc">
            {followsSystem
              ? t('Following your system language, which is {language}.', {
                  language: t(systemSays === 'zh-CN' ? 'Chinese (Simplified)' : 'English')
                })
              : t('Fixed to one language, whatever your system is set to.')}
          </div>
        </div>
        <div className="segment">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              className={clsx('seg-btn', preference === l.id && 'active')}
              // Written straight to settings, which is the persisted home of the
              // choice; LocaleBridge is what turns it into an interface. Nothing
              // is applied here — a second writer is how the two copies of the
              // language this app keeps would drift apart.
              onClick={() => setSettings({ language: l.id })}
            >
              {l.id === 'system' ? t('Follow system') : l.native}
            </button>
          ))}
        </div>
      </div>

      {locale !== 'en' && (
        <div className="setting-row">
          <div className="s-info">
            <div className="s-title">{t('Translation coverage')}</div>
            <div className="s-desc">
              {t(
                'The app shell, Settings and the common dialogs are translated. Panels that have not been translated yet stay in English rather than showing a blank label.'
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

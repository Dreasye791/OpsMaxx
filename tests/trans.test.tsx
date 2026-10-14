// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { Trans } from '../src/renderer/src/i18n/Trans'
import { setLanguagePreference, t } from '../src/renderer/src/i18n'

/**
 * A sentence with markup inside it, translated as one unit.
 *
 * The mechanism exists because the fragments around an inline `<em>` cannot be
 * reordered by a translator, which welds the sentence's grammar to English. The
 * last test here is the one that matters: it renders a REAL source/catalogue
 * pair, so a reworded English sentence that nobody re-translated fails here
 * rather than silently reverting a screen to English.
 */

// `setLanguagePreference` writes module state that outlives a single test, and
// every other renderer test asserts English text.
afterEach(() => setLanguagePreference('en'))

describe('Trans', () => {
  it('puts the element where the sentence puts its slot', () => {
    const { container } = render(
      <Trans source="The value {em} here." components={{ em: <em>matters</em> }} />
    )
    expect(container.textContent).toBe('The value matters here.')
    expect(container.querySelector('em')?.textContent).toBe('matters')
  })

  it('fills several slots in the order the sentence names them', () => {
    const { container } = render(
      <Trans
        source="{a} then {b}"
        components={{ a: <em>first</em>, b: <strong>second</strong> }}
      />
    )
    expect(container.textContent).toBe('first then second')
    expect(container.querySelector('em')?.textContent).toBe('first')
    expect(container.querySelector('strong')?.textContent).toBe('second')
  })

  it('keeps a slot nobody filled visible, rather than dropping a word', () => {
    const { container } = render(<Trans source="a {strong} b" />)
    expect(container.textContent).toBe('a {strong} b')
  })

  it('substitutes values, so a value is not mistaken for a slot', () => {
    const { container } = render(<Trans source="{count} traced events" values={{ count: 7 }} />)
    expect(container.textContent).toBe('7 traced events')
  })

  it('renders a missing entry as its English source, the way t does', () => {
    const { container } = render(<Trans source="Nothing has {em} here." components={{ em: <em>ever</em> }} />)
    expect(container.textContent).toBe('Nothing has ever here.')
  })

  it('moves the slot to where the translation wants it', () => {
    setLanguagePreference('zh-CN')
    const { container } = render(
      <Trans
        source="The trace names the internal operations that ran and the errors they raised. Errors routinely carry {strong} from your machine and your servers. Passwords, keys and tokens are filtered out before anything is written; a hostname cannot be, because no rule tells one from an ordinary word. Read it, and delete any line you would rather not publish once you have attached it."
        components={{
          strong: <strong>{t('hostnames, usernames, file paths and command text')}</strong>
        }}
      />
    )
    expect(container.querySelector('strong')?.textContent).toBe('主机名、用户名、文件路径和命令文本')
    // The emphasised phrase lands BEFORE 「，来自你的机器」 — in the English it
    // came after "routinely carry". That reordering is the whole point.
    expect(container.textContent).toContain(
      '错误信息里经常带有主机名、用户名、文件路径和命令文本，来自你的机器和你的服务器。'
    )
    // No slot survived, and no English sentence did either: if the catalogue key
    // ever drifts from the source above, this is where it shows up.
    expect(container.textContent).not.toContain('{strong}')
    expect(container.textContent).not.toMatch(/[A-Za-z]{4,}/)
  })
})

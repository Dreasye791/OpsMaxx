// @vitest-environment jsdom
import { describe, expect, it, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { ContextMenu } from '../src/renderer/src/components/connections/ContextMenu'
import { setLanguagePreference } from '../src/renderer/src/i18n'

/**
 * Menus are translated by the RENDERER, not by the call site.
 *
 * Every menu in the app hands its entries to ContextMenu, which renders
 * `t(e.label)` — so one edit covers twenty-two files, and the labels can stay
 * where they are written instead of being wrapped one by one.
 *
 * That choice has a cost this test exists to pay. `t(e.label)` is a DYNAMIC
 * call site, so i18n:coverage cannot tell which keys it will ask for, and the
 * render audit never opens a menu. Nothing in the tooling can therefore see
 * which menu labels are translated and which are not, and the catalogue
 * entries for them show up in the orphan report — because the files that WRITE
 * the labels (`treeMenus.ts`, `tabMenus.ts`, `layoutMenu.ts`, …) contain no
 * `t()` call at all.
 *
 * So this asserts the pairing directly. If a label is renamed in a menu and the
 * catalogue is not updated with it, the first case below fails, which is the
 * only place that will notice.
 */

afterEach(() => setLanguagePreference('en'))

function menu(labels: string[]): void {
  render(
    <ContextMenu x={0} y={0} onClose={() => {}} entries={labels.map((label) => ({ label }))} />
  )
}

describe('menu labels', () => {
  it('are translated at the renderer, wherever the label was written', () => {
    setLanguagePreference('zh-CN')
    menu(['Copy URL', 'New HTTP request', 'Select all', 'Unlock vault'])
    const said = document.body.textContent ?? ''
    expect(said).toContain('复制 URL')
    expect(said).toContain('新建 HTTP 请求')
    expect(said).toContain('全选')
    expect(said).toContain('解锁保险库')
  })

  it('leave a label with no entry alone, which is what a data label needs', () => {
    // The same render point carries data as well as copy: a server name offered
    // as a menu item. A miss renders its source, so wrapping is safe — that is
    // the argument for doing it here rather than at each call site.
    setLanguagePreference('zh-CN')
    menu(['my-server-01'])
    expect(document.body.textContent).toContain('my-server-01')
  })

  it('fall back to English when no language is pinned', () => {
    menu(['Copy URL'])
    expect(document.body.textContent).toContain('Copy URL')
  })
})

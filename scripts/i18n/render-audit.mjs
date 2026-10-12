/**
 * What the running app actually shows, screen by screen.
 *
 *   node scripts/i18n/render-audit.mjs            # report
 *   node scripts/i18n/render-audit.mjs --json out.json
 *
 * ── Why this exists beside coverage.mjs ─────────────────────────────────────
 *
 * `coverage.mjs` reads the source. It answers "which `t()` calls have no entry",
 * which is the right question for a translator and the wrong one for anyone
 * deciding whether the work landed: a call site can be wrapped and translated
 * and still render English, because the string a person sees is not always a
 * literal at the render site. Three ways that happens, all of them invisible to
 * a source scan:
 *
 *   1. A data table defined in a `.ts` file (`setupQuestions.ts`, the label maps
 *      in `store/nav.ts`) whose VALUES are rendered. Nothing to wrap at the
 *      definition — a `t()` there would freeze the language at import time,
 *      before the locale is known. The fix is `t(row.label)` where it renders.
 *   2. A module-scope table in a `.tsx` file, same shape.
 *   3. A literal inside a JSX expression (`{busy ? 'Cancel' : 'Send'}`), which
 *      the codemod does not touch — it handles JSX text and attributes only.
 *
 * So this walks the real UI over the Chrome DevTools Protocol and reports the
 * finished strings. Two numbers matter: how much of what is on screen is
 * Chinese, and the exact list of what is not. A run that raises the first and
 * shortens the second is progress; anything else is a claim.
 *
 * ── Requirements ────────────────────────────────────────────────────────────
 *
 * `npm run build` first: this drives `out/`, which is the same code the packaged
 * exe runs. It launches Electron directly (not packaged), with
 * OPSMAXX_DEMO_PROFILE=1 so it cannot write a real profile. See docs/i18n.md.
 */

import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const ELECTRON = join(ROOT, 'node_modules', 'electron', 'dist', 'electron.exe')
const PORT = Number(process.env.I18N_AUDIT_PORT ?? 9335)
const jsonFlag = process.argv.indexOf('--json')
const jsonOut = jsonFlag !== -1 ? process.argv[jsonFlag + 1] : null

const env = { ...process.env }
// Present in this shell and fatal to a GUI launch: electron.exe degrades to node
// and the window never opens.
delete env.ELECTRON_RUN_AS_NODE
env.OPSMAXX_DEMO_PROFILE = '1'

const child = spawn(
  ELECTRON,
  ['.', '--no-sandbox', '--disable-gpu', '--in-process-gpu', `--remote-debugging-port=${PORT}`],
  { cwd: ROOT, env, stdio: ['ignore', 'pipe', 'pipe'] }
)
let log = ''
child.stdout.setEncoding('utf8')
child.stderr.setEncoding('utf8')
child.stdout.on('data', (d) => (log += d))
child.stderr.on('data', (d) => (log += d))

const die = (msg) => {
  console.error(msg)
  try { child.kill('SIGKILL') } catch { /* already gone */ }
  process.exit(1)
}

let target = null
for (let i = 0; i < 60 && !target; i++) {
  await sleep(1000)
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()
    target = list.find((t) => t.type === 'page' && !t.url.startsWith('devtools://'))
  } catch { /* not up yet */ }
}
if (!target) die('renderer never appeared:\n' + log.slice(-1500))
await sleep(7000)

const ws = new WebSocket(target.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
})
await new Promise((res, rej) => {
  ws.addEventListener('open', res)
  ws.addEventListener('error', rej)
})
const send = (method, params) => {
  const myId = ++id
  return new Promise((res) => { pending.set(myId, res); ws.send(JSON.stringify({ id: myId, method, params })) })
}
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400))
  return r.result?.result?.value
}

const COLLECT = `(() => {
  const texts = new Set(), attrs = new Set()
  const vis = (el) => {
    if (!el) return false
    const s = getComputedStyle(el)
    if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false
    const r = el.getBoundingClientRect()
    return r.width > 0 && r.height > 0
  }
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let n
  while ((n = w.nextNode())) {
    if (!vis(n.parentElement)) continue
    const s = (n.nodeValue || '').replace(/\\s+/g, ' ').trim()
    if (s) texts.add(s)
  }
  for (const el of document.querySelectorAll('[title],[placeholder],[aria-label],[alt]')) {
    if (!vis(el)) continue
    for (const a of ['title', 'placeholder', 'aria-label', 'alt']) {
      const v = el.getAttribute(a)
      if (v) attrs.add(v.replace(/\\s+/g, ' ').trim())
    }
  }
  return JSON.stringify({ texts: [...texts], attrs: [...attrs] })
})()`

const pressEscape = async () => {
  const k = { key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 }
  await send('Input.dispatchKeyEvent', { type: 'keyDown', ...k })
  await send('Input.dispatchKeyEvent', { type: 'keyUp', ...k })
}

// Onboarding sits above everything on a fresh profile; Escape accepts what is on
// screen and skips the rest, which is what gets us to the main UI.
await pressEscape()
await sleep(2000)
for (let i = 0; i < 3; i++) {
  const clicked = await evaluate(`(() => {
    const b = [...document.querySelectorAll('button')]
      .find((x) => ['Skip', 'Next', 'Done', 'Finish', 'Get started'].includes((x.textContent || '').trim()))
    if (b) { b.click(); return (b.textContent || '').trim() }
    return null
  })()`)
  if (!clicked) break
  await sleep(1500)
}
await pressEscape()
await sleep(2500)

const rail = JSON.parse((await evaluate(
  `JSON.stringify([...document.querySelectorAll('.activity-btn')].map((b, i) => ({ i, label: b.getAttribute('aria-label') || b.title || '' })))`
)) || '[]')

const screens = [{ screen: '(initial)', label: '', ...JSON.parse(await evaluate(COLLECT)) }]
for (const b of rail) {
  const ok = await evaluate(`(() => { const b = document.querySelectorAll('.activity-btn')[${b.i}]; if (!b) return false; b.click(); return true })()`)
  if (!ok) continue
  await sleep(2200)
  screens.push({ screen: `rail:${b.i}`, label: b.label, ...JSON.parse(await evaluate(COLLECT)) })
}

try { child.kill('SIGKILL') } catch { /* already gone */ }

// ── Report
const CJK = /[\u4e00-\u9fff]/
const isChrome = (s) => !/[A-Za-z]{2}/.test(s) || /^[A-Z]:\\/.test(s)
const zh = new Set(), en = new Map()
const per = []
for (const s of screens) {
  const items = [...s.texts, ...s.attrs]
  const a = items.filter((x) => CJK.test(x))
  const b = items.filter((x) => !CJK.test(x) && !isChrome(x) && x.length > 2)
  a.forEach((x) => zh.add(x))
  b.forEach((x) => en.set(x, (en.get(x) ?? 0) + 1))
  per.push([s.screen, s.label, a.length, b.length])
}

console.log('render audit — what the built app shows')
console.log('')
console.log('  screen                     zh    en   zh%')
for (const [scr, label, a, b] of per) {
  const tot = a + b
  console.log('  %s %s %s %s', scr.padEnd(10), String(label).slice(0, 20).padEnd(22),
    String(a).padStart(3), String(b).padStart(4), (tot ? Math.round((100 * a) / tot) : 0).toString().padStart(4) + '%')
}
const T = zh.size + en.size
console.log('')
console.log('  distinct strings: %d Chinese, %d English -> %d%% Chinese',
  zh.size, en.size, T ? Math.round((100 * zh.size) / T) : 0)
console.log('')
console.log('  UNTRANSLATED (seen on %s)'.replace('%s', 'at least one screen'))
;[...en.entries()].sort((x, y) => y[1] - x[1]).forEach(([k, n]) => console.log('    %d screen(s)  %s', n, k))

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify({ screens, chinese: [...zh], english: [...en.keys()] }, null, 2))
  console.log('')
  console.log('  wrote %s', jsonOut)
}

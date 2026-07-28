// remix-editor-v2 documentation screenshot harness
// usage: node capture.mjs --lang ja [--out <dir>] [--keep]
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

const argv = process.argv.slice(2)
const arg = (name, def) => {
  const i = argv.indexOf(`--${name}`)
  return i >= 0 ? argv[i + 1] : def
}
const LANG = arg('lang', 'ja')
if (!['ja', 'en'].includes(LANG)) throw new Error('lang must be ja|en')
const OUT =
  arg('out', null) ??
  `D:/VSCodeProject/stremix-jp/remix-editor-docs/${LANG}/images`
const URL_ = arg('url', 'http://localhost:5173/')
const HEADED = argv.includes('--headed')
mkdirSync(OUT, { recursive: true })

const VW = 1600
const VH = 900
const AUDIO_ID = 'seed-audio-1'
const MAX_TIME = 60

// ---------------------------------------------------------------- seed data
const uid = (p, i) => `${p}-${String(i).padStart(3, '0')}`

function buildPatterns() {
  const now = Date.now()
  // 1) main vibration: swelling sine bursts
  const p1 = []
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * MAX_TIME
    const env = 0.45 + 0.45 * Math.sin((Math.PI * t) / MAX_TIME)
    const v = 10 + 9 * env * Math.sin((t / MAX_TIME) * Math.PI * 7)
    p1.push({
      id: uid('pt1', i),
      time: Math.round(t * 100) / 100,
      value: Math.max(0, Math.min(20, Math.round(v * 10) / 10)),
    })
  }
  // 2) linear motion: triangle ramps
  const p2 = []
  const seg = [0, 4, 9, 13, 18, 22, 27, 31, 36, 40, 45, 49, 54, 58, 60]
  seg.forEach((t, i) => {
    const v = i % 2 === 0 ? 3 : 17
    p2.push({ id: uid('pt2', i), time: t, value: v })
  })
  // 3) accents: stepped plateaus
  const p3 = []
  let k = 0
  const steps = [
    [0, 6, 2],
    [6, 18, 6],
    [18, 30, 13],
    [30, 42, 8],
    [42, 54, 16],
    [54, 60, 3],
  ]
  for (const [s, e, v] of steps) {
    p3.push({ id: uid('pt3', k++), time: s, value: v })
    p3.push({ id: uid('pt3', k++), time: e - 0.4, value: v })
  }

  const mk = (id, name, color, points, extra = {}) => ({
    id,
    name,
    color,
    isVisible: true,
    isOutputEnabled: true,
    points,
    settings: {
      maxValue: 20,
      minValue: 0,
      valueStep: 1,
      allowNegativeValues: false,
      preferredDeviceType: null,
      preferredActuatorType: null,
      ...extra,
    },
    createdAt: now - 86400000,
    updatedAt: now - 3600000,
  })

  return [
    mk('pattern-main', 'メイン振動', '#ec4899', p1, {
      preferredActuatorType: 'Vibrate',
    }),
    mk('pattern-linear', 'リニア動作', '#06b6d4', p2, {
      preferredActuatorType: 'Position',
    }),
    mk('pattern-accent', 'アクセント', '#8b5cf6', p3),
  ]
}

function buildSections() {
  const rows = [
    [0, 6, 'イントロ', '10', 'フェードイン'],
    [6, 18, 'Aメロ', '10->30 全体', '徐々に強く'],
    [18, 30, 'サビ', '30', 'メイン振動を強調'],
    [30, 42, 'Bメロ', '30->15 全体', 'クールダウン'],
    [42, 54, 'ラストサビ', '40', '最大強度'],
    [54, 60, 'アウトロ', '5', 'フェードアウト'],
  ]
  const columns = [
    { id: 'label', label: 'label', width: 160, editable: true },
    { id: 'intensity_params', label: 'intensity_params', width: 180, editable: true },
    { id: 'notes', label: 'notes', width: 220, editable: true },
  ]
  const sections = rows.map(([s, e, label, intensity, notes], i) => ({
    id: `section-${String(i + 1).padStart(2, '0')}`,
    startTime: s,
    endTime: e,
    data: { label, intensity_params: intensity, notes },
    isGap: false,
  }))
  return { sections, columns }
}

const PATTERNS = buildPatterns()
const SECTIONS = buildSections()

const seed = {
  lang: LANG,
  audioId: AUDIO_ID,
  patterns: PATTERNS,
  sections: SECTIONS.sections,
  columns: SECTIONS.columns,
}

// runs before every navigation, inside the page
function initScript(s) {
  try {
    localStorage.clear()
  } catch {
    /* ignore */
  }
  localStorage.setItem('i18nextLng', s.lang)
  localStorage.setItem(
    'editor-patterns',
    JSON.stringify({
      state: { patterns: s.patterns, activePatternId: s.patterns[0].id },
      version: 0,
    })
  )
  localStorage.setItem(
    'editor-sections',
    JSON.stringify({
      state: {
        sections: s.sections,
        columns: s.columns,
        showAllSections: false,
        csvFileName: 'sections.csv',
      },
      version: 0,
    })
  )
  localStorage.setItem(
    'editor-settings',
    JSON.stringify({
      state: { general: { language: s.lang, theme: 'light', experimentalMode: false } },
      version: 0,
    })
  )
  localStorage.setItem('remix-editor-current-audio-id', s.audioId)
}

// ---------------------------------------------------------------- audio seed
// Builds a 60s 16-bit mono WAV with a musical-looking envelope and writes it
// into the Dexie-created IndexedDB (audioBlobs / audioMetadata).
async function seedAudio([audioId, duration]) {
  const rate = 16000
  const n = Math.floor(rate * duration)
  const buf = new ArrayBuffer(44 + n * 2)
  const view = new DataView(buf)
  const wstr = (o, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(o + i, str.charCodeAt(i))
  }
  wstr(0, 'RIFF')
  view.setUint32(4, 36 + n * 2, true)
  wstr(8, 'WAVE')
  wstr(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, rate, true)
  view.setUint32(28, rate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  wstr(36, 'data')
  view.setUint32(40, n * 2, true)

  let seedv = 12345
  const rnd = () => {
    seedv = (seedv * 1103515245 + 12345) & 0x7fffffff
    return seedv / 0x7fffffff - 0.5
  }
  for (let i = 0; i < n; i++) {
    const t = i / rate
    // phrase envelope: 6 sections with different loudness
    const sec = Math.floor(t / 10)
    const secLevel = [0.35, 0.6, 0.95, 0.55, 1.0, 0.25][sec % 6]
    const attack = Math.min(1, (t % 10) / 0.4)
    const release = Math.min(1, (10 - (t % 10)) / 0.8)
    // syllable-like modulation
    const syl = 0.35 + 0.65 * Math.abs(Math.sin(t * Math.PI * 2.7))
    const env = secLevel * attack * release * syl
    const tone =
      0.6 * Math.sin(2 * Math.PI * 180 * t) +
      0.25 * Math.sin(2 * Math.PI * 320 * t) +
      0.15 * Math.sin(2 * Math.PI * 640 * t)
    const v = env * (tone * 0.75 + rnd() * 0.35) * 0.8
    view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 32000, true)
  }
  const blob = new Blob([buf], { type: 'audio/wav' })

  const db = await new Promise((res, rej) => {
    const r = indexedDB.open('remix-editor-v2')
    r.onsuccess = () => res(r.result)
    r.onerror = () => rej(r.error)
  })
  await new Promise((res, rej) => {
    const tx = db.transaction(['audioBlobs', 'audioMetadata'], 'readwrite')
    tx.objectStore('audioBlobs').put({ id: audioId, blob })
    tx.objectStore('audioMetadata').put({
      id: audioId,
      filename: 'sample-voice.wav',
      mimeType: 'audio/wav',
      size: blob.size,
      duration,
      createdAt: Date.now(),
    })
    tx.oncomplete = () => res()
    tx.onerror = () => rej(tx.error)
  })

  // waveform library items (keeps the right-hand panel from looking empty)
  const now = Date.now()
  const mkPts = (fn, n, dur) =>
    Array.from({ length: n + 1 }, (_, i) => ({
      id: `wl-${i}`,
      time: Math.round(((i / n) * dur) * 1000) / 1000,
      value: Math.round(fn(i / n) * 10) / 10,
    }))
  const items = [
    {
      id: 'wl-sine',
      name: 'サイン波',
      points: mkPts((x) => 10 + 9 * Math.sin(x * Math.PI * 2), 24, 2),
      duration: 2,
    },
    {
      id: 'wl-saw',
      name: 'ノコギリ波',
      points: mkPts((x) => 20 * ((x * 2) % 1), 32, 2),
      duration: 2,
    },
    {
      id: 'wl-fadein',
      name: 'フェードイン',
      points: mkPts((x) => 20 * x * x, 12, 3),
      duration: 3,
    },
    {
      id: 'wl-pulse',
      name: 'パルス',
      points: mkPts((x) => (Math.floor(x * 8) % 2 === 0 ? 18 : 1), 32, 2),
      duration: 2,
    },
  ]
  await new Promise((res, rej) => {
    const tx = db.transaction(['waveformItems'], 'readwrite')
    const store = tx.objectStore('waveformItems')
    for (const it of items) {
      store.put({
        id: it.id,
        name: it.name,
        folderId: null,
        points: it.points,
        duration: it.duration,
        maxValue: 20,
        createdAt: now,
        updatedAt: now,
      })
    }
    tx.oncomplete = () => res()
    tx.onerror = () => rej(tx.error)
  })
  db.close()
  localStorage.setItem('remix-editor-current-audio-id', audioId)
  return blob.size
}

// ---------------------------------------------------------------- helpers
const T = {
  ja: {
    patternList: 'パターン',
    curveCanvas: 'カーブエディタ',
    sectionTable: 'セクション',
    devicePanel: 'デバイス',
    waveformGenerator: '波形生成',
    propertyPanel: 'プロパティ',
    waveformLibrary: '波形ライブラリ',
    settings: '設定',
    file: 'ファイル',
    shortcuts: 'ショートカット',
    general: '一般',
    startPreview: '波形生成',
  },
  en: {
    patternList: 'Patterns',
    curveCanvas: 'Curve Editor',
    sectionTable: 'Sections',
    devicePanel: 'Devices',
    waveformGenerator: 'Waveform Generator',
    propertyPanel: 'Properties',
    waveformLibrary: 'Waveform Library',
    settings: 'Settings',
    file: 'File',
    shortcuts: 'Shortcuts',
    general: 'General',
    startPreview: 'Generate Waveform',
  },
}

async function activateTab(page, title) {
  const tab = page.locator('.dv-tab', { hasText: new RegExp(`^${title}`) }).first()
  await tab.click()
  await page.waitForTimeout(350)
}

/** bounding box of the dockview group that currently shows `title` as active tab */
async function groupBox(page, title) {
  return page.evaluate((title) => {
    const groups = [...document.querySelectorAll('.dv-groupview')]
    for (const g of groups) {
      const active = g.querySelector('.dv-tab.dv-active-tab')
      if (active && active.textContent.trim().startsWith(title)) {
        const r = g.getBoundingClientRect()
        return { x: r.x, y: r.y, width: r.width, height: r.height }
      }
    }
    return null
  }, title)
}

async function shotGroup(page, title, file, maxHeight) {
  const box = await groupBox(page, title)
  if (!box) throw new Error(`group not found for tab "${title}"`)
  const h = maxHeight ? Math.min(Math.round(box.height) + 4, maxHeight) : Math.round(box.height) + 4
  await page.screenshot({
    path: path.join(OUT, file),
    clip: {
      x: Math.round(box.x) - 2,
      y: Math.round(box.y) - 2,
      width: Math.round(box.width) + 4,
      height: h,
    },
  })
  console.log(`  ${file}  (${Math.round(box.width)}x${h})`)
}

/** click a content button (by text) inside the group showing `title` */
async function clickInGroup(page, title, text) {
  const ok = await page.evaluate(
    ([title, text]) => {
      for (const g of document.querySelectorAll('.dv-groupview')) {
        const active = g.querySelector('.dv-tab.dv-active-tab')
        if (!active || !active.textContent.trim().startsWith(title)) continue
        for (const b of g.querySelectorAll('button')) {
          if (b.closest('.dv-tabs-container') || b.closest('.dv-right-actions-container'))
            continue
          if (b.textContent.trim().includes(text)) {
            b.click()
            return true
          }
        }
      }
      return false
    },
    [title, text]
  )
  await page.waitForTimeout(500)
  return ok
}

/** drag the horizontal dockview sash near `nearY` by `dy` px */
async function dragHSash(page, nearY, dy) {
  const s = await page.evaluate((nearY) => {
    let best = null
    for (const el of document.querySelectorAll('.dv-sash')) {
      const r = el.getBoundingClientRect()
      if (r.width > 300 && r.height < 20 && Math.abs(r.y + r.height / 2 - nearY) < 90) {
        const d = Math.abs(r.y + r.height / 2 - nearY)
        if (!best || d < best.d) best = { x: r.x + r.width / 2, y: r.y + r.height / 2, d }
      }
    }
    return best
  }, nearY)
  if (!s) return false
  await page.mouse.move(s.x, s.y)
  await page.mouse.down()
  await page.mouse.move(s.x, s.y + dy / 2, { steps: 6 })
  await page.mouse.move(s.x, s.y + dy, { steps: 6 })
  await page.mouse.up()
  await page.waitForTimeout(400)
  return true
}

/** click the maximize button in the header of the group showing `title` */
async function maximizeGroup(page, title) {
  await page.evaluate((title) => {
    for (const g of document.querySelectorAll('.dv-groupview')) {
      const active = g.querySelector('.dv-tab.dv-active-tab')
      if (active && active.textContent.trim().startsWith(title)) {
        const btns = g.querySelectorAll('.dv-right-actions-container button')
        btns[btns.length - 1]?.click()
        return
      }
    }
  }, title)
  await page.waitForTimeout(500)
}

async function shotFull(page, file) {
  await page.screenshot({ path: path.join(OUT, file) })
  console.log(`  ${file}  (full ${VW}x${VH})`)
}

/** canvas geometry of the curve editor */
async function canvasGeo(page) {
  return page.evaluate(() => {
    const c = document.querySelector('canvas')
    const r = c.getBoundingClientRect()
    return { x: r.x, y: r.y, w: r.width, h: r.height }
  })
}
const P = { left: 40, right: 35, top: 40, bottom: 30 }
function toScreen(geo, time, value, vp = { s: 0, e: 60, min: 0, max: 20 }) {
  const px = P.left + ((time - vp.s) / (vp.e - vp.s)) * (geo.w - P.left - P.right)
  const py = P.top + (1 - (value - vp.min) / (vp.max - vp.min)) * (geo.h - P.top - P.bottom)
  return { x: geo.x + px, y: geo.y + py }
}

// ---------------------------------------------------------------- main
const browser = await chromium.launch({ headless: !HEADED })
const context = await browser.newContext({
  viewport: { width: VW, height: VH },
  deviceScaleFactor: 1,
  locale: LANG === 'ja' ? 'ja-JP' : 'en-US',
  reducedMotion: 'reduce',
})
await context.addInitScript(initScript, seed)
const page = await context.newPage()
page.on('pageerror', (e) => console.log('  [pageerror]', e.message))

console.log(`[${LANG}] loading ${URL_}`)
await page.goto(URL_, { waitUntil: 'networkidle' })
await page.waitForSelector('.dv-groupview', { timeout: 30000 })
await page.waitForTimeout(1200)

console.log(`[${LANG}] seeding audio`)
const size = await page.evaluate(seedAudio, [AUDIO_ID, MAX_TIME])
console.log(`  wav ${(size / 1024 / 1024).toFixed(2)} MB`)

await page.reload({ waitUntil: 'networkidle' })
await page.waitForSelector('.dv-groupview')
await page.waitForTimeout(2500) // waveform decode

const t = T[LANG]

// move the playhead to ~12s so the footer / timeline are not at zero
{
  const geo = await canvasGeo(page)
  const s = toScreen(geo, 12, 0)
  await page.mouse.click(s.x, geo.y + 15) // playhead area (y < 30)
  await page.waitForTimeout(400)
}

// 01 full screen
await activateTab(page, t.curveCanvas)
await shotFull(page, '01-full-screen.png')

// 02 pattern list (item + settings section expanded)
await activateTab(page, t.patternList)
{
  const grew = await dragHSash(page, 447, 300) // give the panel room for the form
  const expand = page.locator('button.h-5.w-5.shrink-0').first()
  await expand.click()
  await page.waitForTimeout(300)
  await clickInGroup(page, t.patternList, t.settings)
  await shotGroup(page, t.patternList, '02-pattern-list.png', 640)
  // collapse again and restore the layout
  await expand.click()
  await page.waitForTimeout(200)
  if (grew) await dragHSash(page, 747, -300)
}

// 03 curve editor
await activateTab(page, t.curveCanvas)
await shotGroup(page, t.curveCanvas, '03-curve-editor.png')

// 04 section table
await shotGroup(page, t.sectionTable, '04-section-panel.png')

// 05 footer
{
  const box = await page.locator('footer').first().boundingBox()
  await page.screenshot({
    path: path.join(OUT, '05-footer.png'),
    clip: { x: 0, y: Math.round(box.y) - 1, width: VW, height: Math.round(box.height) + 1 },
  })
  console.log('  05-footer.png')
}

// 06 device panel (disconnected state)
await activateTab(page, t.devicePanel)
await shotGroup(page, t.devicePanel, '06-device-panel.png', 230)
await activateTab(page, t.patternList)

// 09 rectangular selection (ctrl + left drag) — must come before 07/08
{
  const geo = await canvasGeo(page)
  const a = toScreen(geo, 14, 19.4)
  const b = toScreen(geo, 32, 1.5)
  await page.keyboard.down('Control')
  await page.mouse.move(a.x, a.y)
  await page.mouse.down()
  await page.mouse.move((a.x + b.x) / 2, (a.y + b.y) / 2, { steps: 8 })
  await page.mouse.move(b.x, b.y, { steps: 8 })
  await page.mouse.up()
  await page.keyboard.up('Control')
  await page.waitForTimeout(500)
  await shotFull(page, '09-selection.png')
}

// 07 waveform generator (needs an active range selection + preview mode)
await activateTab(page, t.waveformGenerator)
await clickInGroup(page, t.waveformGenerator, t.startPreview)
await shotGroup(page, t.waveformGenerator, '07-waveform-generator.png', 560)

// 08 property panel with a single selected point
{
  const geo = await canvasGeo(page)
  const pt = PATTERNS[0].points[12]
  const s = toScreen(geo, pt.time, pt.value)
  await page.mouse.click(s.x, s.y)
  await page.waitForTimeout(300)
  await activateTab(page, t.propertyPanel)
  await shotGroup(page, t.propertyPanel, '08-property-panel.png', 300)
}

// 10 file menu open
{
  await page.locator('button[role="menuitem"]', { hasText: t.file }).first().click()
  await page.waitForTimeout(500)
  await shotFull(page, '10-file-menu.png')
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
}

// 11 / 12 settings panel (maximized so the form is readable)
{
  await page.locator('canvas').first().click({ position: { x: 5, y: 5 } })
  await page.keyboard.press('Control+Comma')
  await page.waitForTimeout(900)
  await maximizeGroup(page, t.settings)
  await shotFull(page, '11-settings-panel.png')
  await page
    .locator('.dv-groupview button', { hasText: new RegExp(`^${t.shortcuts}$`) })
    .first()
    .click()
  await page.waitForTimeout(700)
  await shotFull(page, '12-shortcuts-settings.png')
}

console.log(`[${LANG}] done -> ${OUT}`)
await browser.close()

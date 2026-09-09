import { defineConfig } from 'vitepress'

// ja/en で同一のファイル構成（CLAUDE.md の規約）。章の追加・削除時はここも更新する。
// 2 部構成: 基礎講座（basics/。作る順に読む通し講座）と リファレンス（機能ごと。よく使う順）。
const basics = [
  { file: 'basics/01-open', ja: '1. エディタを開く', en: '1. Opening the Editor' },
  { file: 'basics/02-screen', ja: '2. 画面の構成', en: '2. Screen Layout' },
  { file: 'basics/03-playback', ja: '3. 再生と移動、ズーム', en: '3. Playback, Seeking & Zoom' },
  { file: 'basics/04-patterns', ja: '4. パターンを用意する', en: '4. Setting Up Patterns' },
  { file: 'basics/05-sections', ja: '5. セクションを読む', en: '5. Reading Sections' },
  { file: 'basics/06-generate', ja: '6. 波形を生成する', en: '6. Generating Waveforms' },
  { file: 'basics/07-adjust', ja: '7. 手で調整する', en: '7. Adjusting by Hand' },
  { file: 'basics/08-preview', ja: '8. プレビューする', en: '8. Previewing' },
  { file: 'basics/09-save', ja: '9. 保存する', en: '9. Saving' },
  { file: 'basics/10-by-device', ja: '10. デバイス別の作り方の基本', en: '10. Basics by Device Type' },
]

const reference = [
  { file: '02-display-layout', ja: '表示とレイアウト', en: 'Display & Layout' },
  { file: '03-patterns', ja: 'パターン', en: 'Patterns' },
  { file: '04-import-save', ja: 'インポートと保存', en: 'Import & Save' },
  { file: '05-devices', ja: 'デバイス', en: 'Devices' },
  { file: '06-curve-editor', ja: 'カーブエディタ', en: 'Curve Editor' },
  { file: '07-properties', ja: 'プロパティ', en: 'Properties' },
  { file: '08-sections', ja: 'セクションデータ', en: 'Section Data' },
  { file: '09-waveform-generation', ja: '波形生成', en: 'Waveform Generation' },
  { file: '10-waveform-library', ja: '波形ライブラリ', en: 'Waveform Library' },
  { file: '11-shortcuts', ja: 'ショートカット', en: 'Shortcuts' },
  { file: '12-faq', ja: 'FAQ', en: 'FAQ' },
]

type Locale = 'ja' | 'en'
const group = (locale: Locale, text: string, items: typeof basics) => ({
  text,
  items: items.map((c) => ({ text: c[locale], link: `/${locale}/${c.file}` })),
})

const sidebar = (locale: Locale, labels: { basics: string; reference: string }) => [
  group(locale, labels.basics, basics),
  group(locale, labels.reference, reference),
]

export default defineConfig({
  title: 'remix-editor',
  srcDir: '.',
  srcExclude: ['README.md', 'CLAUDE.md'],
  rewrites: {
    'ja/README.md': 'ja/index.md',
    'en/README.md': 'en/index.md',
  },
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  locales: {
    ja: {
      label: '日本語',
      lang: 'ja',
      description: 'remix-editor ユーザーガイド',
      themeConfig: {
        nav: [{ text: 'ガイド', link: '/ja/' }],
        sidebar: sidebar('ja', { basics: '基礎講座', reference: 'リファレンス' }),
        outline: { label: 'このページの内容' },
        docFooter: { prev: '前のページ', next: '次のページ' },
        lastUpdatedText: '最終更新',
        returnToTopLabel: 'トップへ戻る',
        darkModeSwitchLabel: 'テーマ',
        sidebarMenuLabel: 'メニュー',
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      description: 'remix-editor User Guide',
      themeConfig: {
        nav: [{ text: 'Guide', link: '/en/' }],
        sidebar: sidebar('en', { basics: 'Basics Course', reference: 'Reference' }),
      },
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          ja: {
            translations: {
              button: { buttonText: '検索', buttonAriaLabel: '検索' },
              modal: {
                displayDetails: '詳細を表示',
                resetButtonTitle: 'クリア',
                backButtonTitle: '戻る',
                noResultsText: '見つかりませんでした',
                footer: {
                  selectText: '選択',
                  navigateText: '移動',
                  closeText: '閉じる',
                },
              },
            },
          },
        },
      },
    },
    // すとりみっくす！のロゴ。実体は stremix-ui/registry/stremix/logo/ の写し。
    // 2 枚構成（light / dark）が規約（stremix-design GUIDELINES §4-6。色反転の使い回し禁止）。
    logo: { light: '/logo.svg', dark: '/logo-dark.svg' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stremix-jp/remix-editor-docs' },
    ],
  },
})

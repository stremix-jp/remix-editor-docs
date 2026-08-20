import { defineConfig } from 'vitepress'

// ja/en で同一のファイル構成（CLAUDE.md の規約）。章の追加・削除時はここも更新する。
// 章順は「触る順 / よく使う順」（2026-08-20 オーナー指示）。
const chapters = [
  { file: '01-getting-started', ja: 'はじめに', en: 'Getting Started' },
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

const sidebar = (locale: 'ja' | 'en', label: string) => [
  {
    text: label,
    items: chapters.map((c) => ({ text: c[locale], link: `/${locale}/${c.file}` })),
  },
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
        sidebar: sidebar('ja', 'ユーザーガイド'),
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
        sidebar: sidebar('en', 'User Guide'),
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

import { defineConfig } from 'vitepress'

// ja/en で同一のファイル構成（CLAUDE.md の規約）。章の追加・削除時はここも更新する。
const chapters = [
  { file: '01-getting-started', ja: 'はじめに', en: 'Getting Started' },
  { file: '02-ui-overview', ja: '画面構成', en: 'UI Overview' },
  { file: '03-patterns', ja: 'パターン管理', en: 'Patterns' },
  { file: '04-curve-editing', ja: 'カーブ編集', en: 'Curve Editing' },
  { file: '05-sections', ja: 'セクション', en: 'Sections' },
  { file: '06-devices', ja: 'デバイス接続', en: 'Devices' },
  { file: '07-playback', ja: '再生操作', en: 'Playback' },
  { file: '08-file-operations', ja: 'ファイル操作', en: 'File Operations' },
  { file: '09-shortcuts', ja: 'ショートカット', en: 'Shortcuts' },
  { file: '10-faq', ja: 'FAQ', en: 'FAQ' },
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
  head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
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
    // ARK のマーク（方舟）。実体は plugins/ark-design/design/assets/ark-mark.svg の写し。
    // fill=currentColor なので、テーマ側の色（.VPImage に当てている）で青になる。
    logo: '/ark-mark.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stremix-jp/remix-editor-docs' },
    ],
  },
})

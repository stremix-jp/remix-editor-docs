// VitePress の既定テーマに stremix サービスデザインの見た目を被せるだけの薄い層。
// レイアウトもコンポーネントも差し替えない（既定テーマの更新に追従できなくなるため）。
// 当てている値は custom.css を読む（値の SSOT は stremix-ui/src/theme/theme.css）。
import DefaultTheme from 'vitepress/theme'
import '@fontsource-variable/inter'
import './custom.css'

export default DefaultTheme

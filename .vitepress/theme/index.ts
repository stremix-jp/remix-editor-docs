// VitePress の既定テーマに ARK の見た目を被せるだけの薄い層。
// レイアウトもコンポーネントも差し替えない（既定テーマの更新に追従できなくなるため）。
// 当てている値は custom.css を読む。
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme

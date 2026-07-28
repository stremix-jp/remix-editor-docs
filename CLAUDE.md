# remix-editor-docs

## Overview
remix-editor v2 のユーザードキュメント。日本語・英語の2言語対応。
VitePress でビルドし、Cloudflare Workers（静的アセット）で https://remix-editor-docs.stremix.jp に公開。

## Structure
```
ja/           # 日本語ドキュメント（コンテンツの SSOT。en は ja に追従）
en/           # 英語ドキュメント
├── 01-getting-started.md
├── 02-ui-overview.md
├── 03-patterns.md
├── 04-curve-editing.md
├── 05-sections.md
├── 06-devices.md
├── 07-playback.md
├── 08-file-operations.md
├── 09-shortcuts.md
├── 10-faq.md
├── README.md   # 各言語の目次（サイトでは /ja/ /en/ の index に rewrite）
└── images/
.vitepress/   # サイト設定（config.mts。章の追加時は sidebar 定義も更新）
public/       # ルートの言語振り分けページ・favicon
wrangler.jsonc # Cloudflare Workers デプロイ設定（account_id ピン留め済み）
```

## Commands
```bash
pnpm dev      # ローカルプレビュー
pnpm build    # 静的ビルド（dead link はビルドエラーになる）
pnpm deploy   # build + wrangler deploy（remix-editor-docs.stremix.jp へ）
```

## Conventions
- 日英で同じファイル名・構成を維持する
- 画像は各言語フォルダ内の `images/` に配置（ja/en で同名。UI 言語だけ切り替えて撮影）
- Markdown形式、番号付きファイル名で章順を管理
- 章を増減したら `.vitepress/config.mts` の `chapters` 配列も更新する
- スクリーンショットは Playwright ハーネスで再取得できる（サンプルデータを localStorage/IndexedDB に注入して撮影）。エディタ UI が変わったら撮り直す

## Related Repositories
- [remix-editor-v2](https://github.com/stremix-jp/remix-editor-v2) — 対象アプリ。ドキュメント更新時はここの実装が正

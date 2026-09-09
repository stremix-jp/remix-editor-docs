# remix-editor-docs

## Overview
remix-editor v2 のユーザードキュメント。日本語・英語の2言語対応。
VitePress でビルドし、Cloudflare Workers（静的アセット）で https://remix-editor-docs.stremix.jp に公開。

## Structure
```
ja/           # 日本語ドキュメント（コンテンツの SSOT。en は ja に追従）
en/           # 英語ドキュメント
├── README.md   # 各言語の目次（サイトでは /ja/ /en/ の index に rewrite）。リファレンスの「やりたいこと別」表もここ
├── basics/     # 基礎講座（作る順に読む通し講座。これだけで Remix を 1 本作れる）
│   ├── 01-open.md … 10-by-device.md
├── 02-display-layout.md   # ここから下はリファレンス（機能ごと。よく使う順）
├── 03-patterns.md
├── 04-import-save.md
├── 05-devices.md
├── 06-curve-editor.md
├── 07-properties.md
├── 08-sections.md
├── 09-waveform-generation.md
├── 10-waveform-library.md
├── 11-shortcuts.md
├── 12-faq.md
└── images/
.vitepress/   # サイト設定（config.mts。章の追加時は basics / reference 配列も更新）
public/       # ルートの言語振り分けページ・favicon・すとりみっくす！ロゴ（light/dark 2 枚）
wrangler.jsonc # Cloudflare Workers デプロイ設定（account_id ピン留め済み）
```

2 部構成（2026-09-09 オーナー指示）。**基礎講座**は旧リミクサー研修資料のエディタ操作部分を
作る順に並べ直したもので、丁寧に書く。ただしセクションの `_params` 列からの波形生成は基礎に
入れない（リファレンスの波形生成にだけ置く）。**リファレンス**は機能の個別紹介で、章順は
「触る順 / よく使う順」（2026-08-20 オーナー指示）。旧 01-getting-started は基礎講座に吸収した。
セクションデータは「見る」（文字起こし確認・メモ・ナビゲーション）を主用途として書く。
波形生成の各方式に主力 / 補助の位置づけを書かない（フラットに機能説明する。706da51）。

社内向けの Remix 制作ガイド（ark-pages）はこの基礎講座を参照して研修を組む。
ガイド側の内容（制作方針・品質基準・業務フロー）をこちらへ書かない。

## Commands
```bash
pnpm dev      # ローカルプレビュー
pnpm build    # 静的ビルド（dead link はビルドエラーになる）
pnpm deploy   # build + wrangler deploy（remix-editor-docs.stremix.jp へ）
```

## Conventions
- 日英で同じファイル名・構成を維持する
- 外部公開ドキュメントなので、社内の命名規則（パターン命名など）を書かない
- サイトの見た目は stremix サービスデザイン準拠（.vitepress/theme/custom.css。
  値の SSOT は stremix-ui/src/theme/theme.css、規則は stremix-design plugin）
- 画像は各言語フォルダ内の `images/` に配置（ja/en で同名。UI 言語だけ切り替えて撮影）
- Markdown形式、番号付きファイル名で章順を管理
- 章を増減したら `.vitepress/config.mts` の `basics` / `reference` 配列も更新する
- スクリーンショットは Playwright ハーネスで再取得できる（サンプルデータを localStorage/IndexedDB に注入して撮影）。エディタ UI が変わったら撮り直す

## Related Repositories
- [remix-editor-v2](https://github.com/stremix-jp/remix-editor-v2) — 対象アプリ。ドキュメント更新時はここの実装が正

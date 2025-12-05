# 調査 & 設計決定

## 概要
- **機能**: tech-info-dashboard
- **発見スコープ**: 新機能（グリーンフィールド）
- **主な発見事項**:
  - RSSフィード取得はCORS制約によりサーバーサイドで処理が必要
  - クライアントサイドの大量データ永続化にはIndexedDBが最適
  - 全文検索はfuse.jsで十分なパフォーマンスを実現可能

## 調査ログ

### フィードパーサーライブラリの選定
- **コンテキスト**: RSS/Atom/JSON Feed形式のパースが必要
- **参照したソース**:
  - [rss-parser](https://github.com/rbren/rss-parser) - Node.js向けRSS/Atomパーサー
  - [feedparser](https://github.com/danmactough/node-feedparser) - 低レベルストリームパーサー
- **発見事項**:
  - rss-parserはシンプルで使いやすく、RSS 2.0/Atom両対応
  - ブラウザでのフィード取得はCORS制約があるため、サーバーサイド処理が必須
  - Next.js Server ActionsまたはRoute Handlersでプロキシする設計が現実的
- **影響**: フィード取得はサーバーサイドAPI経由、パース結果をクライアントに返却

### クライアントサイドストレージの選定
- **コンテキスト**: 記事データ、ブックマーク、設定の永続化が必要
- **参照したソース**:
  - MDN Web Docs - IndexedDB API
  - MDN Web Docs - Web Storage API
- **発見事項**:
  - localStorageは5MB制限、同期API、文字列のみ
  - IndexedDBは大容量対応（数百MB〜）、非同期API、構造化データ対応
  - Dexie.jsはIndexedDBのラッパーで開発体験が良い
- **影響**: 記事データはIndexedDB（Dexie.js）、ユーザー設定はlocalStorage

### 全文検索の実装アプローチ
- **コンテキスト**: タイトル・本文からのキーワード検索が必要
- **参照したソース**:
  - [Fuse.js](https://fusejs.io/) - 軽量あいまい検索ライブラリ
  - [FlexSearch](https://github.com/nextapps-de/flexsearch) - 高速全文検索
- **発見事項**:
  - Fuse.jsはあいまい検索に強く、設定が簡単
  - FlexSearchはより高速だが設定が複雑
  - 数千件レベルの記事ならFuse.jsで十分
- **影響**: Fuse.jsをクライアントサイド検索に採用

### フロントエンドフレームワークとスタイリング
- **コンテキスト**: モダンでレスポンシブなUIが必要
- **参照したソース**:
  - Next.js App Router公式ドキュメント
  - shadcn/ui コンポーネントライブラリ
  - Tailwind CSS v3
- **発見事項**:
  - Next.js App RouterはServer Components/Client Componentsの使い分けが重要
  - shadcn/uiはRadix UIベースでアクセシビリティが高い
  - Tailwind CSSはユーティリティファーストでレスポンシブ対応が容易
- **影響**: Next.js 14 + shadcn/ui + Tailwind CSSの構成を採用

## アーキテクチャパターン評価

| オプション | 説明 | 強み | リスク / 制限 | 備考 |
|----------|------|------|--------------|------|
| クライアントサイドSPA | 全処理をブラウザで実行 | シンプル | CORS問題、SEO不利 | 却下 |
| Next.js App Router + Server Actions | サーバー/クライアント分離 | CORS回避、型安全 | 初期設定複雑 | **採用** |
| フルサーバーサイド | APIサーバー + フロントエンド分離 | 完全制御 | インフラ複雑 | オーバースペック |

## 設計決定

### 決定: フィード取得アーキテクチャ
- **コンテキスト**: 外部フィードのCORS制約を回避する必要
- **検討した代替案**:
  1. クライアントサイドで直接fetch → CORS制約で却下
  2. 外部プロキシサービス利用 → 依存性増、レート制限リスク
  3. Next.js Server Actions/Route Handlers → 自前で完結
- **選択したアプローチ**: Next.js Route Handlersでプロキシ
- **根拠**: 依存なし、フル制御可能、型安全
- **トレードオフ**: サーバーリソース必要だがVercel等で無料枠内で運用可能

### 決定: 状態管理ライブラリ
- **コンテキスト**: 記事リスト、フィルタ状態、設定の管理
- **検討した代替案**:
  1. React Context → ボイラープレート多い
  2. Redux Toolkit → オーバースペック
  3. Zustand → 軽量、シンプルAPI
- **選択したアプローチ**: Zustand
- **根拠**: 学習コスト低、永続化ミドルウェアあり、TypeScript相性良好

### 決定: データ永続化層
- **コンテキスト**: オフラインアクセスとデータキャッシュ
- **検討した代替案**:
  1. localStorage → 容量制限
  2. IndexedDB (raw) → API複雑
  3. IndexedDB (Dexie.js) → 使いやすいラッパー
- **選択したアプローチ**: Dexie.js (IndexedDB)
- **根拠**: 大容量対応、Promise API、リアクティブクエリ対応

## リスク & 軽減策
- **フィード取得の信頼性** — リトライロジックとエラーステータス表示で対応
- **IndexedDBブラウザ互換性** — モダンブラウザでは問題なし、古いブラウザはlocalStorageフォールバック
- **検索パフォーマンス** — 記事数が増えた場合はWebWorkerへのオフロードを検討

## 参考文献
- [Next.js App Router](https://nextjs.org/docs/app) — サーバー/クライアント分離
- [Dexie.js](https://dexie.org/) — IndexedDBラッパー
- [Fuse.js](https://fusejs.io/) — クライアントサイド検索
- [shadcn/ui](https://ui.shadcn.com/) — UIコンポーネント
- [Zustand](https://zustand-demo.pmnd.rs/) — 状態管理


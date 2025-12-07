# EARSフォーマットガイドライン

## 概要
EARS（Easy Approach to Requirements Syntax）は、仕様駆動開発における受け入れ基準の標準フォーマット。

EARSパターンは要件の論理構造（条件 + 主体 + 応答）を記述し、特定の自然言語に縛られない。
すべての受け入れ基準は、仕様で設定されたターゲット言語（例: `spec.json.language` / `ja`）で記述すること。
EARSのトリガーキーワードと固定フレーズは英語のまま（`When`, `If`, `While`, `Where`, `The system shall`, `The [system] shall`）とし、可変部分（`[event]`, `[precondition]`, `[trigger]`, `[feature is included]`, `[response/action]`）のみターゲット言語にローカライズする。トリガーや固定英語フレーズの中にターゲット言語のテキストを混ぜないこと。

## 主要なEARSパターン

### 1. イベント駆動型要件
- **パターン**: When [event], the [system] shall [response/action]
- **ユースケース**: 特定のイベントやトリガーへの応答
- **例**: When ユーザーがチェックアウトボタンをクリック, the Checkout Service shall カート内容を検証

### 2. 状態駆動型要件
- **パターン**: While [precondition], the [system] shall [response/action]
- **ユースケース**: システム状態や前提条件に依存する振る舞い
- **例**: While 支払い処理中, the Checkout Service shall ローディングインジケーターを表示

### 3. 望ましくない振る舞いへの要件
- **パターン**: If [trigger], the [system] shall [response/action]
- **ユースケース**: エラー、障害、望ましくない状況へのシステム応答
- **例**: If 無効なクレジットカード番号が入力された, then the website shall エラーメッセージを表示

### 4. オプション機能要件
- **パターン**: Where [feature is included], the [system] shall [response/action]
- **ユースケース**: オプションまたは条件付き機能の要件
- **例**: Where 車にサンルーフが搭載されている, the car shall サンルーフコントロールパネルを持つ

### 5. ユビキタス要件
- **パターン**: The [system] shall [response/action]
- **ユースケース**: 常時有効な要件と基本的なシステム特性
- **例**: The モバイルフォン shall 重量100グラム未満とする

## 複合パターン
- While [precondition], when [event], the [system] shall [response/action]
- When [event] and [additional condition], the [system] shall [response/action]

## 主体選択ガイドライン
- **ソフトウェアプロジェクト**: 具体的なシステム/サービス名を使用（例: 「Checkout Service」、「User Auth Module」）
- **プロセス/ワークフロー**: 責任チーム/役割を使用（例: 「サポートチーム」、「レビュープロセス」）
- **ソフトウェア以外**: 適切な主体を使用（例: 「マーケティングキャンペーン」、「ドキュメント」）

## 品質基準
- 要件はテスト可能、検証可能であり、単一の振る舞いを記述すること。
- 客観的な言語を使用: 必須の振る舞いには「shall」、推奨には「should」。曖昧な用語は避ける。
- EARS構文に従う: [condition], the [system] shall [response/action]。

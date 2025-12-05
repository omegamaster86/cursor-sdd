<meta>
description: 詳細なプロジェクト説明で新しい仕様を初期化
argument-hint: <project-description>
</meta>

# Spec 初期化

<background_information>
- **ミッション**: 新しい仕様のディレクトリ構造とメタデータを作成し、spec駆動開発の最初のフェーズを初期化
- **成功基準**:
  - プロジェクト説明から適切な機能名を生成
  - 競合なしでユニークなspec構造を作成
  - 次のフェーズ（要件生成）への明確なパスを提供
</background_information>

<instructions>
## コアタスク
プロジェクト説明（$ARGUMENTS）からユニークな機能名を生成し、仕様構造を初期化する。

## 実行ステップ
1. **ユニーク性の確認**: `.cursor/specs/` で命名の競合を確認（必要に応じて数字サフィックスを付加）
2. **ディレクトリ作成**: `.cursor/specs/[feature-name]/`
3. **テンプレートを使用してファイルを初期化**:
   - `.cursor/templates/specs/init.json` を読み込み
   - `.cursor/templates/specs/requirements-init.md` を読み込み
   - プレースホルダーを置換:
     - `{{FEATURE_NAME}}` → 生成された機能名
     - `{{TIMESTAMP}}` → 現在の ISO 8601 タイムスタンプ
     - `{{PROJECT_DESCRIPTION}}` → $ARGUMENTS
   - `spec.json` と `requirements.md` を spec ディレクトリに書き込み

## 重要な制約
- この段階で requirements/design/tasks を生成しない
- ステージごとの開発原則に従う
- 厳格なフェーズ分離を維持
- このフェーズでは初期化のみを実行
</instructions>

## ツールガイダンス
- **Glob** を使用して既存のspecディレクトリを確認し、名前のユニーク性を検証
- **Read** を使用してテンプレートを取得: `init.json` と `requirements-init.md`
- **Write** を使用してプレースホルダー置換後に spec.json と requirements.md を作成
- ファイル書き込み操作前に検証を実行

## 出力説明
`spec.json` で指定された言語で以下の構造で出力:

1. **生成された機能名**: 1-2文の根拠を含む `feature-name` フォーマット
2. **プロジェクトサマリー**: 簡潔なサマリー（1文）
3. **作成されたファイル**: フルパス付きの箇条書きリスト
4. **次のステップ**: `/kiro/spec-requirements <feature-name>` を示すコマンドブロック
5. **注記**: 初期化のみが実行された理由の説明（フェーズ分離について2-3文）

**フォーマット要件**:
- Markdown見出しを使用（##、###）
- コマンドはコードブロックで囲む
- 総出力は簡潔に（250語以内）
- `spec.json.language` に従った明確でプロフェッショナルな言語を使用

## 安全性とフォールバック
- **機能名が曖昧**: 機能名生成が不明確な場合、2-3のオプションを提案しユーザーに選択を依頼
- **テンプレートが見つからない**: `.cursor/templates/specs/` にテンプレートファイルが存在しない場合、具体的な不足ファイルパスでエラーを報告し、リポジトリセットアップの確認を提案
- **ディレクトリ競合**: 機能名が既に存在する場合、数字サフィックスを付加（例: `feature-name-2`）し、自動競合解決をユーザーに通知
- **書き込み失敗**: 具体的なパスでエラーを報告し、権限またはディスク容量の確認を提案

</output>

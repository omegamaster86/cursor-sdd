# 実装計画

## タスク形式テンプレート

作業分解に適したパターンを使用：

### メジャータスクのみ
- [ ] {{NUMBER}}. {{TASK_DESCRIPTION}}{{PARALLEL_MARK}}
  - {{DETAIL_ITEM_1}} *（必要な場合のみ詳細を含める。タスクが単独で成立する場合は箇条書きを省略。）*
  - _要件: {{REQUIREMENT_IDS}}_

### メジャー + サブタスク構造
- [ ] {{MAJOR_NUMBER}}. {{MAJOR_TASK_SUMMARY}}
- [ ] {{MAJOR_NUMBER}}.{{SUB_NUMBER}} {{SUB_TASK_DESCRIPTION}}{{SUB_PARALLEL_MARK}}
  - {{DETAIL_ITEM_1}}
  - {{DETAIL_ITEM_2}}
  - _要件: {{REQUIREMENT_IDS}}_ *（IDのみ。説明や括弧を追加しない。）*

> **並列マーカー**: 並列実行可能なタスクにのみ` (P)`を付加。`--sequential`モードで実行する場合はマーカーを省略。
>
> **オプションのテストカバレッジ**: 受け入れ基準に関連する延期可能なテスト作業のサブタスクの場合、チェックボックスを`- [ ]*`としてマークし、詳細の箇条書きで参照要件を説明。

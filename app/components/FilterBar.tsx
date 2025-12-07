'use client';

import type { FilterType } from '../types/todo';

interface FilterBarProps {
  filter: FilterType;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了済み' },
];

/**
 * フィルターバーコンポーネント
 * フィルター選択と完了済み一括削除機能を提供
 */
export function FilterBar({
  filter,
  activeCount,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
      {/* 未完了タスク数 */}
      <p className="text-white/60 text-sm">
        <span className="text-white font-semibold">{activeCount}</span>
        {' '}件の未完了タスク
      </p>

      {/* フィルターボタン */}
      <div className="flex gap-1 bg-white/5 rounded-lg p-1">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)}
            className={`
              px-4 py-1.5 rounded-md text-sm font-medium
              transition-all duration-200
              ${filter === key
                ? 'bg-white/20 text-white'
                : 'text-white/50 hover:text-white/80 hover:bg-white/10'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 完了済み削除ボタン */}
      {completedCount > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="
            text-sm text-white/50 hover:text-rose-400
            transition-colors duration-200
            underline underline-offset-2
          "
        >
          完了済みを削除
        </button>
      )}
    </div>
  );
}


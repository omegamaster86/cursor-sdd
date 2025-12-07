'use client';

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

/**
 * 個別タスク表示・操作コンポーネント
 * チェック、編集、削除機能を提供
 */
export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  // 編集モード時に入力フィールドにフォーカス
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSubmitEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSubmitEdit();
  };

  return (
    <div
      className={`
        group flex items-center gap-3 px-4 py-3 rounded-xl
        bg-white/10 backdrop-blur-sm
        border-2 border-white/10
        transition-all duration-300
        hover:bg-white/15 hover:border-white/20
        ${todo.completed ? 'opacity-60' : ''}
      `}
    >
      {/* チェックボックス */}
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className={`
          w-6 h-6 rounded-full border-2 flex-shrink-0
          flex items-center justify-center
          transition-all duration-300
          ${todo.completed
            ? 'bg-emerald-400/80 border-emerald-400/80'
            : 'border-white/40 hover:border-white/60'
          }
        `}
        aria-label={todo.completed ? 'タスクを未完了にする' : 'タスクを完了にする'}
      >
        {todo.completed && (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* テキスト部分 */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="
            flex-1 bg-white/10 px-3 py-1 rounded-lg
            text-white border border-white/30
            focus:outline-none focus:border-white/50
          "
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className={`
            flex-1 cursor-pointer select-none
            transition-all duration-300
            ${todo.completed
              ? 'line-through text-white/50'
              : 'text-white'
            }
          `}
        >
          {todo.text}
        </span>
      )}

      {/* 削除ボタン */}
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="
          opacity-0 group-hover:opacity-100
          w-8 h-8 rounded-lg flex-shrink-0
          flex items-center justify-center
          text-white/60 hover:text-rose-400
          hover:bg-white/10
          transition-all duration-200
        "
        aria-label="タスクを削除"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}


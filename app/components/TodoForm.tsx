'use client';

import { useState, type FormEvent, type KeyboardEvent } from 'react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

/**
 * タスク追加フォームコンポーネント
 * テキスト入力とバリデーション機能を提供
 */
export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      setError('タスクを入力してください');
      return;
    }
    
    onAdd(trimmedText);
    setText('');
    setError('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (value: string) => {
    setText(value);
    if (error && value.trim()) {
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="新しいタスクを入力..."
            className={`
              w-full px-4 py-3 rounded-xl
              bg-white/10 backdrop-blur-sm
              border-2 transition-all duration-200
              text-white placeholder-white/50
              focus:outline-none focus:ring-2 focus:ring-white/20
              ${error 
                ? 'border-rose-400/60 focus:border-rose-400' 
                : 'border-white/20 focus:border-white/40'
              }
            `}
          />
          {error && (
            <p className="absolute -bottom-6 left-0 text-rose-300 text-sm animate-fade-in">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="
            px-6 py-3 rounded-xl
            bg-white/20 hover:bg-white/30
            border-2 border-white/20 hover:border-white/40
            text-white font-medium
            transition-all duration-200
            hover:scale-105 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-white/20
          "
        >
          追加
        </button>
      </div>
    </form>
  );
}


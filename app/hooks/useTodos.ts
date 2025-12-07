'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Todo, FilterType, UseTodosReturn } from '../types/todo';

/**
 * UUIDを生成
 */
const generateId = (): string => {
  return crypto.randomUUID();
};

/**
 * Todoの状態管理とCRUD操作を提供するカスタムフック
 * 
 * @returns UseTodosReturn - タスク状態と操作関数
 */
export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // フィルタリング済みタスクリスト
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // 未完了タスク数
  const activeCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  // 完了済みタスク数
  const completedCount = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  // タスクを追加
  const addTodo = useCallback((text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newTodo: Todo = {
      id: generateId(),
      text: trimmedText,
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [...prev, newTodo]);
  }, []);

  // タスクの完了状態を切り替え
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // タスクを削除
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // タスクのテキストを編集
  const editTodo = useCallback((id: string, text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      )
    );
  }, []);

  // 完了済みタスクを一括削除
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  return {
    todos,
    filteredTodos,
    filter,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
    clearCompleted,
  };
}


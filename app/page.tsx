'use client';

import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

export default function TodoPage() {
  const {
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
  } = useTodos();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-10 animate-slide-up">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            ✨ Todo
          </h1>
          <p className="text-white/60">
            シンプルで美しいタスク管理
          </p>
        </header>

        {/* メインコンテンツ */}
        <div className="space-y-6">
          {/* タスク追加フォーム */}
          <section className="animate-slide-up stagger-1">
            <TodoForm onAdd={addTodo} />
          </section>

          {/* フィルターバー */}
          <section className="animate-slide-up stagger-2">
            <FilterBar
              filter={filter}
              activeCount={activeCount}
              completedCount={completedCount}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          </section>

          {/* タスクリスト */}
          <section className="animate-slide-up stagger-3">
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </section>
        </div>

        {/* フッター */}
        <footer className="mt-12 text-center text-white/30 text-sm animate-slide-up stagger-4">
          <p>ダブルクリックでタスクを編集</p>
        </footer>
      </div>
    </main>
  );
}

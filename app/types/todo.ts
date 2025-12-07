/**
 * Todoエンティティの型定義
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

/**
 * フィルタータイプのユニオン型
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * useTodosフックの戻り値型
 */
export interface UseTodosReturn {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterType;
  activeCount: number;
  completedCount: number;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
}


import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Todo {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export interface TodoForm {
  title: string;
  startDate: string;
  endDate: string;
}

interface State {
  todos: Todo[];
}

interface Action {
  saveTodo: (todo: TodoForm) => void;
  deleteTodo: (id: number) => void;
}

const init: State = {
  todos: [],
}

export const useTodoStore = create<State & Action>()(
  persist(
    (set) => ({
      ...init,

      saveTodo: (todo) => set((state) => {
        return {
          todos: [
            ...state.todos,
            {
              id: (state.todos.at(-1)?.id || 0) + 1,
              ...todo,
            }
          ]
        };
      }),
      deleteTodo: (id: number) => set((state) => {
        return {
          todos: state.todos.filter((todo) => todo.id !== id),
        };
      }),
    }),
    { name: 'todoStore' }
  )
)
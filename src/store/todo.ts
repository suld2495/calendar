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
  todo: Todo;
}

interface Action {
  saveTodo: (todo: TodoForm) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
  setForm: (todo: Todo) => void;
  clearForm: () => void;
}

const init: State = {
  todos: [],
  todo: {
    id: 0,
    title: '',
    startDate: '',
    endDate: '',
  },
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

      updateTodo: (todo) => set((state) => {
        const oldIndex = state.todos.findIndex((todo) => todo.id === todo.id);

        return {
          todos: state.todos.map((prev, index) => {
            return index === oldIndex ? todo : prev;
          })
        }
      }),

      deleteTodo: (id: number) => set((state) => {
        return {
          todos: state.todos.filter((todo) => todo.id !== id),
        };
      }),

      setForm: (todo) => set({ todo }),

      clearForm: () => set({ todo: init.todo }),
    }),
    { name: 'todoStore' }
  )
)
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Todo {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

interface State {
  todos: Todo[];
}

interface Action {

}

const init: State = {
  todos: [],
}

export const useTodoStore = create<State & Action>()(
  persist(
    (set) => ({
      ...init,
    }),
    { name: 'todoStore' }
  )
)
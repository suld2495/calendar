import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Todo {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

type CreateTodoForm = Omit<Todo, "id">;

interface State {
  todos: Todo[];
  form: {
    id?: string;
    title: string;
    startDate: string;
    endDate: string;
  };
}

interface Action {
  save: (todo: CreateTodoForm) => void;
  update: (todo: Todo) => void;
  delete: (id: number) => void;
  changeForm: (key: string, value: string | Date | number) => void;
  clearForm: () => void;
}

const init: State = {
  todos: [],
  form: {
    title: "",
    startDate: "",
    endDate: "",
  },
};

export const useTodoStore = create<State & Action>()(
  persist(
    (set) => ({
      ...init,

      save: () => {},
      update: () => {},
      delete: () => {},

      changeForm: (key, value) =>
        set((state) => ({
          form: {
            ...state.form,
            [key]: value,
          },
        })),
      clearForm: () => set({ form: { ...init.form } }),
    }),
    { name: "todoStore" }
  )
);

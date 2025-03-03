import { create } from "zustand"

interface State {
  year: number;
  month: number;
}

interface Action {
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setYearMonth: (year: number, month: number) => void;
  prev: () => void;
  next: () => void;
  setToday: () => void;
}

const init: State = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
}

export const useDateStore = create<State & Action>()((set) => ({
  ...init,
  setYear: (year: number) => set({ year }),
  setMonth: (month: number) => set({ month }),
  setYearMonth: (year: number, month: number) => set({ year, month }),

  prev: () => (set((state) => {
    const date = new Date(state.year, state.month, 0);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    }
  })),

  next: () => (set((state) => {
    const date = new Date(state.year, state.month + 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    }
  })),

  setToday: () => set({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 }),
}))
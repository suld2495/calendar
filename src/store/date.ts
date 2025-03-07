import { StateCreator } from "zustand"
import { CalendarSlice, DateSlice } from "./type";

export const createDateSlice: StateCreator<
  CalendarSlice,
  [],
  [],
  DateSlice
> = (set) => ({
  year: new Date().getFullYear(),
  month: new Date().getMonth(),

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

  setToday: () => set({ year: new Date().getFullYear(), month: new Date().getMonth() }),
});
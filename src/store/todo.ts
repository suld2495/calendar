import { StateCreator } from "zustand"
import { CalendarSlice, TodoSlice } from "./type";

export const createTodoSlice: StateCreator<
  CalendarSlice,
  [],
  [],
  TodoSlice
> = (set) => ({
  todos: [],
});
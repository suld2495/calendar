import { StateCreator } from "zustand"
import { CalendarSlice, ContextMenuSlice } from "./type";

export const createContextMenuSlice: StateCreator<
  CalendarSlice,
  [],
  [],
  ContextMenuSlice
> = (set) => ({
  contextmenu: false,
  position: { x: 0, y: 0 },

  isMouseDown: false,
  startDate: null,
  endDate: null,

  showContextmenu: (x: number, y: number) => set({ contextmenu: true, position: { x, y } }),
  hideContextmenu: () => set({
    contextmenu: false,
    position: { x: 0, y: 0 },
    isMouseDown: false,
  }),

  setStartDate: (date: Date) => set({ startDate: date, endDate: null, isMouseDown: true }),
  setEndDate: (date: Date) => set({ endDate: date }),
});
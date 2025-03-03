import { create } from "zustand"

interface State {
  contextmenu: boolean;
  position: { x: number, y: number };
  isMouseDown: boolean;
  startDate: Date | null;
  endDate: Date | null;
}

interface Action {
  showContextmenu: (x: number, y: number) => void;
  hideContextmenu: () => void;

  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const init: State = {
  contextmenu: false,
  position: { x: 0, y: 0 },

  isMouseDown: false,
  startDate: null,
  endDate: null,
}

export const useContextmenuStore = create<State & Action>()((set) => ({
  ...init,

  showContextmenu: (x: number, y: number) => set({ contextmenu: true, position: { x, y } }),
  hideContextmenu: () => set({
    contextmenu: false,
    position: { x: 0, y: 0 },
    isMouseDown: false,
  }),

  setStartDate: (date: Date) => set({ startDate: date, endDate: null, isMouseDown: true }),
  setEndDate: (date: Date) => set({ endDate: date }),
}))
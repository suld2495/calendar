import { create } from "zustand";

interface State {
  contextmenu: boolean;
  position: { x: number; y: number };
  isMouseDown: boolean;
}

interface Action {
  showContextmenu: (x: number, y: number) => void;
  hideContextmenu: () => void;

  setIsMouseDown: (isMouseDown: boolean) => void;
}

const init: State = {
  contextmenu: false,
  position: { x: 0, y: 0 },

  isMouseDown: false,
};

export const useContextmenuStore = create<State & Action>()((set) => ({
  ...init,

  showContextmenu: (x: number, y: number) =>
    set({ contextmenu: true, position: { x, y } }),
  hideContextmenu: () =>
    set({
      contextmenu: false,
      position: { x: 0, y: 0 },
      isMouseDown: false,
    }),
  setIsMouseDown: (isMouseDown: boolean) => set({ isMouseDown }),
}));

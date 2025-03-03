import { create } from "zustand"

interface State {
  isModal: boolean;
}

interface Action {
  showModal: () => void;
  hideModal: () => void;
}

const init: State = {
  isModal: false,
}

export const useModalStore = create<State & Action>()((set) => ({
  ...init,

  showModal: () => set({ isModal: true }),
  hideModal: () => set({ isModal: false }),
}))
import { StateCreator } from "zustand"
import { CalendarSlice, ModalSlice } from "./type";

export const createModalSlice: StateCreator<
  CalendarSlice,
  [],
  [],
  ModalSlice
> = (set) => ({
  isModal: false,

  showModal: () => set({ isModal: true }),
  hideModal: () => set({ isModal: false }),
});
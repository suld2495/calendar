import { create } from "zustand";
import { createContextMenuSlice } from "./contextmenu";
import { createDateSlice } from "./date";
import { createModalSlice } from "./modal";
import { CalendarSlice } from "./type";
import { useShallow } from "zustand/shallow";

const useStore = create<CalendarSlice>()((...state) => ({
  ...createContextMenuSlice(...state),
  ...createDateSlice(...state),
  ...createModalSlice(...state),
}));

const useCalendarStore = <T,>(selector: (state: CalendarSlice) => T) => {
  return useStore(useShallow(selector));
}

export default useCalendarStore;

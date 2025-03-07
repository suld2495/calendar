import { create } from "zustand";
import { createContextMenuSlice } from "./contextmenu";
import { createDateSlice } from "./date";
import { createModalSlice } from "./modal";
import { createTodoSlice } from "./todo";
import { CalendarSlice } from "./type";
import { useShallow } from "zustand/shallow";
import { persist } from "zustand/middleware";

const useStore = create<CalendarSlice>()(
  persist(
    (...state) => ({
      ...createContextMenuSlice(...state),
      ...createDateSlice(...state),
      ...createModalSlice(...state),
      ...createTodoSlice(...state),
    }),
    {
      name: "calendar",
    }
  )
);

const useCalendarStore = <T,>(selector: (state: CalendarSlice) => T) => {
  return useStore(useShallow(selector));
}

export default useCalendarStore;

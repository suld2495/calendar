export interface ContextMenuSlice {
  contextmenu: boolean;
  position: { x: number, y: number };
  isMouseDown: boolean;
  startDate: Date | null;
  endDate: Date | null;

  showContextmenu: (x: number, y: number) => void;
  hideContextmenu: () => void;

  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

export interface DateSlice {
  year: number;
  month: number;

  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setYearMonth: (year: number, month: number) => void;
  prev: () => void;
  next: () => void;
  setToday: () => void;
}

export interface ModalSlice {
  isModal: boolean;

  showModal: () => void;
  hideModal: () => void;
}

export type CalendarSlice = ContextMenuSlice & DateSlice & ModalSlice;
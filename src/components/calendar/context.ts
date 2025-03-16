import { createContext } from "react";

export interface CalendarContextProps {
  isDragging: boolean;
  startDate: Date | null;
  endDate: Date | null;
  startDrag: (date: Date) => void;
  endDrag: () => void;
  moveDrag: (date: Date) => void;
}

export const CalendarContext = createContext<CalendarContextProps>({
  isDragging: false,
  startDate: null,
  endDate: null,
  startDrag: () => { },
  endDrag: () => { },
  moveDrag: () => { },
});


export const CELL_VARIANTS = {
  NONE: '',
  DEFAULT: 'pt-2 border-b-[1px] border-b-gray-200 transition-all hover:bg-gray-300 hover:text-white rounded-sm'
}

export interface CellContextProps {
  className?: string;
  variant?: keyof typeof CELL_VARIANTS;
  activeDate?: Date;
  onClick?: (date: Date) => void;
  onDragging?: (date: Date) => void;
  onDragend?: (date: Date) => void;

  setCellOption: (option: Pick<CellContextProps, 'className' | 'variant' | 'activeDate' | 'onClick' | 'onDragging' | 'onDragend'>) => void;
}

export const CellContext = createContext<CellContextProps>({
  onClick: () => { },
  onDragging: () => { },
  onDragend: () => { },

  setCellOption: () => { },
});
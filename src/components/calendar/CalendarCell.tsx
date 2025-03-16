import React, { useContext } from "react";
import { CELL_VARIANTS, CellContext } from "./context";

interface CalendarCellProps {
  className?: string;
  variant?: keyof typeof CELL_VARIANTS;
  activeDate?: Date;
  onClick?: (date: Date) => void;
  onDragging?: (date: Date) => void;
  onDragend?: (date: Date) => void;
}

const CalendarCell = ({ className, variant, activeDate, onClick, onDragging, onDragend } : CalendarCellProps) => {
  const { setClassName, setVariant, setActiveDate, setOnClick, setOnDragging, setOnDragend } = useContext(CellContext);

  setClassName(className);
  setVariant(variant);
  setActiveDate(activeDate);
  setOnClick(() => onClick);
  setOnDragging(() => onDragging);
  setOnDragend(() => onDragend);

  return null;
};

export default React.memo(CalendarCell);
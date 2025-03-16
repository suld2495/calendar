import React, { useContext, useEffect } from "react";
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
  const { setCellOption } = useContext(CellContext);

  useEffect(() => {
    setCellOption({
      className,
      variant,
      activeDate,
      onClick,
      onDragging,
      onDragend,
    });
  }, [activeDate, className, onClick, onDragend, onDragging, setCellOption, variant]);

  return null;
};

export default React.memo(CalendarCell);
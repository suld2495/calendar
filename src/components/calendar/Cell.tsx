import { getToday } from "@/utils/date-utils";
import React, { useContext } from "react";
import { CalendarContext, CELL_VARIANTS, CellContext } from "./context";


interface CellProps {
  date: Date;
  current?: boolean;
  active?: boolean;
}

const Cell = ({ date, active, current = true }: CellProps) => {
  const { 
    className, 
    variant, 
    activeDate, 
    onClick, 
    onDragging, 
    onDragend 
  } = useContext(CellContext);
  const { isDragging } = useContext(CalendarContext);

  const today = getToday();
  let color = '';

  switch (date.getDay()) {
    case 0:
      color = 'text-red-500';
      break;
    case 6:
      color = 'text-blue-500';
      break;
    default:
      color = 'text-gray-500';
  }

  let newClassName = `aspect-auto text-center ${color} select-none flex items-center justify-center cursor-pointer`;

  if (active) {
    newClassName += ' bg-gray text-white';
  }

  if (today.getTime() === date.getTime()) {
    newClassName += ' bg-red-500 text-white';
  }

  if (activeDate?.getTime() === date.getTime()) {
    newClassName += ' bg-gray-400 text-white';
  }

  return (
    <div
      className={`${newClassName} ${className ? className : ''} ${variant ? CELL_VARIANTS[variant] : CELL_VARIANTS.DEFAULT}`} 
      onMouseDown={() => onClick?.(date)} 
      onMouseMove={() => onDragging?.(date)} 
      onMouseUp={() => onDragend?.(date)}
    >
      <span className={!current ? 'opacity-40' : ''}>
        {date.getDate()}
      </span>
    </div>
  )
};

export default React.memo(Cell);

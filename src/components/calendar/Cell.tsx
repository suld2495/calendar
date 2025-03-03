import { useCell } from "@/hooks/useDate";

interface CellProps {
  date: Date;
  current?: boolean;
}

const Cell = ({ date, current = true }: CellProps) => {
  const { 
    checked, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp
  } = useCell(date);  
  
  const day = date.getDay();
  let color = '';

  switch (day) {
    case 0:
      color = 'text-red-500';
      break;
    case 6:
      color = 'text-blue-500';
      break;
    default:
      color = 'text-gray-500';
  }

  return (
    <div 
      className={`aspect-auto text-center pt-2 text-sm ${color} border-b-[1px] border-b-gray-200 transition-all select-none ${checked ? 'bg-blue-100' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <span className={`${!current ? 'opacity-40' : ''}`}>
        {date.getDate()}
      </span>
    </div>
  );
};

export default Cell;

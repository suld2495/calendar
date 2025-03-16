import { useCell } from "@/hooks/useDate";
import { getToday } from "@/utils/date-utils";

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
  
  const today = getToday();
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

  let todayColor = '';

  if (today.getTime() === date.getTime()) {
    todayColor += 'text-white bg-red-500 px-1 rounded-sm';
  }

  return (
    <div 
      className={`aspect-auto text-white text-center pt-2 ${color} border-b-[1px] border-b-[#303030] border-r-[1px] border-r-[#303030] transition-all select-none ${checked ? 'bg-[#413029]' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <span className={`w-full flex justify-end pr-2 leading-6 ${!current ? 'opacity-40' : ''}`}>
        <span className={`${todayColor ? todayColor : ''}`}>
          {date.getDate()}
        </span>
      </span>
    </div>
  );
};

export default Cell;

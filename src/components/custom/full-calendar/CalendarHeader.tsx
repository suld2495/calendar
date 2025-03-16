import useCalendarStore from "@/store";
import { IconSquareArrowLeft, IconSquareArrowRight } from '@tabler/icons-react';

interface MonthButtonProps {
  children: React.ReactNode;
}

interface MonthButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const MonthButton = ({ onClick, children }: MonthButtonProps) => {

  return (
    <button 
      className="flex justify-center items-center px-3 h-7 border-[1px] border-[#808080] text-[#808080] rounded-md cursor-pointer text-sm hover:border-white hover:text-white transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  )
};

const CalendarHeader = () => {
  const [ 
    year, 
    month, 
    setToday, 
    prev, 
    next
  ] = useCalendarStore((state) => [
    state.year, 
    state.month, 
    state.setToday, 
    state.prev, 
    state.next
  ]);

  const iconClassName = "text-[#808080] transition-colors hover:text-white cursor-pointer";

  return (
    <div className="calendar-header flex items-center gap-10 py-10 pl-5">
      <div className="text-white text-4xl font-bold">{year}.{String(month + 1).padStart(2, '0')}</div>
      <div className="text-white flex gap-1 items-center">
        <IconSquareArrowLeft 
          className={iconClassName}
          size={33}
          stroke={1}
          onClick={prev}
        />
        <IconSquareArrowRight 
          className={iconClassName}
          size={33} 
          stroke={1}
          onClick={next}
        />
        <MonthButton onClick={setToday}>오늘</MonthButton>
      </div>
    </div>
  )
}

export default CalendarHeader;
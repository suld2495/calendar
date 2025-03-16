import { IconSquareArrowLeft, IconSquareArrowRight } from '@tabler/icons-react';

interface CalendarHeaderProps {
  year: number;
  month: number;
  prev: () => void;
  next: () => void;
}

const CalendarHeader = ({
  year,
  month,
  prev,
  next
}: CalendarHeaderProps) => {
  const iconClassName = "text-[#808080] transition-colors hover:text-white cursor-pointer";

  return (
    <div className="calendar-header flex justify-between gap-10 mb-2 pl-[7px] pr-[6px]">
      <div className="text-white font-bold">{year}.{String(month + 1).padStart(2, '0')}</div>
      <div className="text-white flex gap-1 items-center">
        <IconSquareArrowLeft 
          className={iconClassName}
          size={20}
          stroke={1}
          onClick={prev}
        />
        <IconSquareArrowRight 
          className={iconClassName}
          size={20} 
          stroke={1}
          onClick={next}
        />
      </div>
    </div>
  )
}

export default CalendarHeader;
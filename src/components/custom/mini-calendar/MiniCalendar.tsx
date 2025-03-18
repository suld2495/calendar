import Calendar from "@/components/calendar/Calendar";
import CalendarCell from "@/components/calendar/CalendarCell";
import CalendarHeader from "./CalendarHeader";
import { useRef, useState } from "react";

interface MiniCalendarProps {
  year?: number;
  month?: number;
  date?: Date;
  position?: { top: number; left: number };
  close: (date?: Date) => void;
}

const MiniCalendar = ({ 
  year: defaultYear = new Date().getFullYear(), 
  month: defaultMonth = new Date().getMonth(), 
  date,
  position = { top: 0, left: 0 },
  close,
}: MiniCalendarProps) => {
  const ref = useRef(null);
  const [year, setYear] = useState(defaultYear);
  const [month, setMonth] = useState(defaultMonth);

  const prev = () => {
    const date = new Date(year, month, 0);

    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };

  const next = () => {
    const date = new Date(year, month + 1);

    setYear(date.getFullYear());
    setMonth(date.getMonth());
  };

  return (
    <div className="absolute w-full h-full left-0 top-0 z-10">
      <div className="absolute w-full h-full z-[9]" onClick={() => close()}></div>
      <div className="fixed z-10 p-2 w-50 h60 bg-[#373737] rounded-lg border-[#444] border-[1px] text-[12px]" 
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <CalendarHeader
          year={year} 
          month={month} 
          prev={prev} 
          next={next} 
        />
        <Calendar
          ref={ref}
          className="mini-calendar"
          year={year} 
          month={month}
        >
          <CalendarCell 
            className="py-1 text-[11px] hover:bg-gray-500 hover:text-white rounded-sm" variant="NONE"
            activeDate={date}
            onClick={close}
          />
        </Calendar>
      </div>
    </div>
  )
};

export default MiniCalendar;

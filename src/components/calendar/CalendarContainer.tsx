import { getLastDate, getMonthWeekDay } from "@/utils/date-utils";
import Cell from "./Cell";

const Day = ({ day }: { day: string }) => {
  let color = 'text-white';

  if (day === '일') {
    color = 'text-red-500';
  }

  if (day === '토') {
    color = 'text-blue-500';
  }

  return (
    <div className={`aspect-auto text-center pt-2 ${color} border-b-[1px] border-b-[#303030] pb-[4pt]`}>
      <span className="opacity-70">{day}</span>
    </div>
  )
}

interface CalendarProps {
  className?: string;
  cellClassName?: string;
  style?: Record<string, string>;
  year: number;
  month: number;
  cell?: (date: Date, current: boolean) => React.ReactNode;
}

const CalendarContainer = ({ 
  className, 
  style, 
  year, 
  month, 
  cell 
}: CalendarProps) => {
  const date = new Date(year, month, 1);
  const [firstWeekDay, lastWeekDay] = getMonthWeekDay(date);
  const lastDate = getLastDate(date);

  const dates = [
    ...Array.from({ length: firstWeekDay }, 
      (_, i) => new Date(year, month, 1 - firstWeekDay + i)
    ),
    ...Array.from({ length: lastDate }, 
      (_, i) => new Date(year, month, i + 1)
    ),
    ...Array.from({ length: 6 - lastWeekDay }, 
      (_, i) => new Date(year, month + 1, i + 1)
    )
  ]

  const isCurrent = (index: number) => {
    return !(index < firstWeekDay || firstWeekDay + lastDate <= index);
  };

  return (
    <div className={`flex flex-col flex-1 ${className ? className : ''}`} style={style}>
      <div className="grid grid-cols-7">
        {
          ['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <Day key={day} day={day} />
          ))
        }
      </div>
      <div className="grid grid-cols-7 flex-1">
        {dates.map((date, index) => cell 
          ? cell(date, isCurrent(index)) 
          : <Cell key={date.getTime()} date={date} current={isCurrent(index)} />)}
      </div>
    </div>
  )
};

export default CalendarContainer;

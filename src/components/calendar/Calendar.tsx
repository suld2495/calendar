import { getLastDate, getMonthWeekDay } from "@/utils/date-utils";
import Cell from "./Cell";
import CalendarHeader from "./CalendarHeader";
import ContextMenu from "../common/ContextMenu";

interface CalendarProps {
  year: number;
  month: number;
}

const Day = ({ day }: { day: string }) => {
  let color = '';

  if (day === '일') {
    color = 'text-red-500';
  }

  if (day === '토') {
    color = 'text-blue-500';
  }

  return (
    <div className={`aspect-auto text-center pt-2 text-sm  ${color} border-b-[1px] border-b-gray-200 pb-4`}>
      <span className="opacity-40">{day}</span>
    </div>
  )
}

const Calendar = ({ year, month }: CalendarProps) => {
  const date = new Date(year, month, 1);
  const [firstWeekDay, lastWeekDay] = getMonthWeekDay(date);
  const lastDate = getLastDate(date);

  return (
    <div className="calendar flex flex-col h-dvh">
      <CalendarHeader year={year} month={month} />
      <div className="grid grid-cols-7">
        {
          ['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <Day key={day} day={day} />
          ))
        }
      </div>
      <div className="grid grid-cols-7 flex-1">
        {Array.from({ length: firstWeekDay }, 
          (_, i) => new Date(year, month - 1, 1 - firstWeekDay + i)
        ).map((date) => (
          <Cell 
            key={date.getTime()} 
            date={date} 
            current={false}
          />
        ))}

        {Array.from({ length: lastDate }, 
          (_, i) => new Date(year, month - 1, i + 1)
        ).map((date) => (
          <Cell 
            key={date.getTime()} 
            date={date} 
          />
        ))}

        {Array.from({ length: 6 - lastWeekDay }, 
          (_, i) => new Date(year, month + 1, i + 1)
        ).map((date) => (
          <Cell 
            key={date.getTime()} 
            date={date} 
            current={false}
          />
        ))}
      </div>

      <ContextMenu />
    </div>
  )
};

export default Calendar;

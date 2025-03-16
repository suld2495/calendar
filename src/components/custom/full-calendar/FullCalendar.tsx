import useCalendarStore from "@/store";
import Cell from "./Cell";
import Calendar from "@/components/calendar/Calendar";
import CalendarHeader from "./CalendarHeader";
import ContextMenu from "@/components/common/ContextMenu";

const FullCalendar = () => {
  const [year, month] = useCalendarStore((state) => [
    state.year, 
    state.month, 
  ]);

  return (
    <>
      <CalendarHeader />
      <Calendar 
        className="text-sm"
        year={year} 
        month={month}
        cell={(date, current) => (
          <Cell 
            key={date.toString()} 
            date={date} 
            current={current}
          />
        )}
      />
      <ContextMenu />
    </>
  )
};

export default FullCalendar;

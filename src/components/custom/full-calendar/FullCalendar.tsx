import useCalendarStore from "@/store";
import Cell from "./Cell";
import Calendar from "@/components/calendar/Calendar";
import CalendarHeader from "./CalendarHeader";
import ContextMenu from "@/components/common/ContextMenu";
import Todos from "@/components/todo/Todos";
import { useEffect, useRef, useState } from "react";

const FullCalendar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);
  const [year, month] = useCalendarStore((state) => [
    state.year, 
    state.month, 
  ]);
  const [item, setItem] = useState<{ width: number; height: number }>();
  const [ 
    hideContextmenu,
    showModal,
  ] = useCalendarStore((state) => ([
    state.hideContextmenu,
    state.showModal,
  ]));

  useEffect(() => {
    if (!cellRef.current) return;
    setItem(cellRef.current.getBoundingClientRect());
  }, []);

  const handleClick = () => {
    hideContextmenu();
    showModal();
  };

  return (
    <>
      <CalendarHeader />
      <Calendar
        ref={ref}
        className="text-sm"
        year={year} 
        month={month}
        cell={(date, current) => (
          <Cell
            ref={cellRef} 
            key={date.toString()} 
            date={date} 
            current={current}
          />
        )}
      />
      <Todos 
        top={ref.current?.getBoundingClientRect().y}
        itemWidth={item?.width}
        itemHeight={item?.height}
      />
      
      <ContextMenu>
        <ContextMenu.Item onClick={handleClick} />
      </ContextMenu>
    </>
  )
};

export default FullCalendar;

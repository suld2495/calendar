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
    contextmenu, 
    position, 
    hideContextmenu,
    showModal,
  ] = useCalendarStore((state) => ([
    state.contextmenu,
    state.position,
    state.hideContextmenu,
    state.showModal,
  ]));

  useEffect(() => {
    if (!cellRef.current) return;
    setItem(cellRef.current.getBoundingClientRect());
  }, [cellRef, year, month]);

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
      
      <ContextMenu
        isShow={contextmenu}
        position={position}
        close={hideContextmenu}
      >
        <ContextMenu.Item>
          <button 
            className="flex w-full items-center gap-4 font-semibold cursor-pointer"
            onClick={handleClick}
          >
            <span className="block w-5 h-3 rounded-sm bg-red-400" />일정
          </button>
        </ContextMenu.Item>
      </ContextMenu>
    </>
  )
};

export default FullCalendar;

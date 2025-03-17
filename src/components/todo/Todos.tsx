import useCalendarStore from "@/store";
import { Todo as TodoType, useTodoStore } from "@/store/todo";
import { getDate } from "@/utils/date-utils";
import React, { useEffect, useRef, useState } from "react";

interface TodoProps extends TodoType {
  top: number;
  itemWidth: number;
  itemHeight: number;
  cells: React.RefObject<number[]>;
}

const Todo = ({ 
  id, 
  itemWidth, 
  itemHeight, 
  top,
  startDate,
  endDate,
  cells,
  title,
}: TodoProps) => {
  const [active, setActive] = useState(false);
  const [year, month] = useCalendarStore((state) => [
    state.year,
    state.month,
  ]);

  if (!itemWidth || !itemHeight) return;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const monthStart = new Date(year, month, -firstDay.getDay() + 1);
  const monthEnd = new Date(year, month + 1, 0 + (6 - lastDay.getDay()));

  let weekStart: Date;
  let weekEnd: Date;

  const list = [];
  let count = 0;

  do {
    const result = {
      start: -1,
      end: -1,
      max: 0,
    };

    weekStart = new Date(monthStart.getFullYear(), monthStart.getMonth(), monthStart.getDate() + 7 * count);;
    weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);

    if (getDate(startDate).getTime() < weekStart.getTime()) {
      result.start = 0;
    } else if (getDate(startDate).getTime() <= weekEnd.getTime()) {
      result.start = getDate(startDate).getDay();
    }

    if (weekEnd.getTime() < getDate(endDate).getTime()) {
      result.end = 6;
    } else if (weekStart.getTime() <= getDate(endDate).getTime()) {
      result.end = getDate(endDate).getDay();
    }

    list.push(result);

    const start = result.start + 7 * count;
    const end = result.end + 7 * count;

    for (let i = start; i < end; i += 1) {
      cells.current[i] = (cells.current[i] || 0) + 1;
    }

    result.max = Math.max(0, ...cells.current.slice(start, end));

    count += 1;
  } while(weekEnd < monthEnd && weekStart.getTime() <= getDate(endDate).getTime());

  const TodoGap = 27;
  const TodoStartTop = 40;

  return (
    <>
      {list
        .filter(({ max }) => max)
        .map(({ start, end, max }, index) => (
          <div 
            key={index}
            className={`absolute h-5 bg-[#653c2b] rounded-sm ${active ? 'bg-[#ff7d44]' : ''}`}
            style={{
              top: top + TodoStartTop + itemHeight * index + (max - 1) * TodoGap,
              left: start * itemWidth + 5,
              width: (end - start + 1) * itemWidth - 20,
            }}
            onClick={() => setActive(true)}
          >
            {!index && <div className="absolute w-1 h-full rounded-l-sm bg-[#fe814a] cursor-col-resize" />}
            <span className="flex h-full leading-2 text-white text-[10px] items-center pl-2 select-none">{title}</span>
          </div>
        ))}
    </>
  )
};

interface TodosProps {
  top?: number;
  itemWidth?: number;
  itemHeight?: number;
}

const Todos = ({ top = 0, itemWidth = 0, itemHeight = 0 }: TodosProps) => {
  const cells = useRef([]);
  const [year, month] = useCalendarStore((state) => [
    state.year,
    state.month,
  ]);
  const todos = useTodoStore((state) => (state.todos));
  const filteredTodos = todos
    .filter(({ startDate, endDate }) => {
      return new Date(year, month, 1).getTime() <= getDate(endDate).getTime()
        && getDate(startDate).getTime() < new Date(year, month + 1, 1).getTime();
    })
    .toSorted((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  useEffect(() => {
    cells.current = [];
  });

  return (
    <div className="todos">
      {filteredTodos.map((todo) => (
        <Todo 
          key={todo.id} 
          top={top} 
          itemWidth={itemWidth} 
          itemHeight={itemHeight} 
          cells={cells}
          {...todo}
        />
      ))}
    </div>
  );
};

export default React.memo(Todos);
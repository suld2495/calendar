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
}: TodoProps) => {
  if (!itemWidth || !itemHeight) return;

  const start = new Date(startDate);
  const date = start.getDate();
  const day = start.getDay();
  const value = Math.ceil(date / 7);
  const rest = date % 7; 
  const rows = value + (day + 1) < rest ? 1 : 0;

  start.setDate(1);
  const first = start.getDay() - 1;
  const last = first + new Date(endDate).getDate();
  const max = Math.max(0, ...cells.current.slice(first, last));

  for (let i = first; i < last; i += 1) {
    cells.current[i] = (cells.current[i] || 0) + 1;
  }

  return (
    <div className="absolute h-4 bg-red-500" style={{ 
      top: top + itemHeight * rows + max * 20, 
      width: itemWidth,
    }}>
    </div>
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

export default Todos;
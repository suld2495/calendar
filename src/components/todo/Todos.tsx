import useCalendarStore from "@/store";
import { Todo as TodoType, useTodoStore } from "@/store/todo";
import { getDate } from "@/utils/date-utils";
import React, { useEffect, useRef, useState } from "react";
import ContextMenu from "../common/ContextMenu";
import { useShallow } from "zustand/shallow";

interface TodoProps extends TodoType {
  top: number;
  itemWidth: number;
  itemHeight: number;
  cells: React.RefObject<number[]>;
  activeId: number;
  handleActive: (id: number) => void;
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
  activeId,
  handleActive,
}: TodoProps) => {
  const [deleteTodo, setForm] = useTodoStore(useShallow((state) => [state.deleteTodo, state.setForm]));
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [year, month, showModal] = useCalendarStore((state) => [
    state.year,
    state.month,
    state.showModal,
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
      count,
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

    if (result.start > -1 && result.end > -1) {
      for (let i = start; i <= end; i += 1) {
        cells.current[i] = (cells.current[i] || 0) + 1;
      }
    }

    result.max = Math.max(0, ...cells.current.slice(start, end + 1));

    count += 1;
  } while(weekEnd < monthEnd && weekStart.getTime() <= getDate(endDate).getTime());

  const handleClick = () => {
    handleActive(-1)
    setForm({
      id,
      title,
      startDate,
      endDate,
    });
    showModal();
  };

  const TodoGap = 27;
  const TodoStartTop = 40;

  return (
    <>
      {list
        .filter(({ max, start }) => max && start > -1)
        .map(({ start, end, max, count }, index) => (
          <div 
            ref={ref}
            key={count}
            className={`todo absolute h-5 bg-[#653c2b] rounded-sm transition-all ease-in-out duration-500 ${activeId === id ? 'bg-[#ff7d44]' : ''}`}
            style={{
              top: top + TodoStartTop + itemHeight * count + (max - 1) * TodoGap,
              left: start * itemWidth + 5,
              width: (end - start + 1) * itemWidth - 20,
            }}
            onClick={(e) => {
              setPosition({ x: e.clientX, y: e.clientY });
              handleActive(id);
            }}
          >
            {!index && <div className="absolute w-1 h-full rounded-l-sm bg-[#fe814a] cursor-col-resize" />}
            <span className="todo flex h-full leading-2 text-white text-[10px] items-center pl-2 select-none cursor-pointer">{title}</span>
          </div>
        ))}
      
      <ContextMenu
        className="z-10"
        isShow={activeId === id}
        position={position}
        close={() => handleActive(-1)}
      >
        <ContextMenu.Item>
          <button 
            className="flex w-full items-center gap-4 font-semibold cursor-pointer"
            onClick={handleClick}
          >
            <span className="block w-5 h-3 rounded-sm bg-blue-400" />수정
          </button>
        </ContextMenu.Item>
        <ContextMenu.Item>
          <button 
            className="flex w-full items-center gap-4 font-semibold cursor-pointer"
            onClick={() => {
              if (confirm('정말 삭제하시겠습니까?')) {
                deleteTodo(id);
              }
            }}
          >
            <span className="block w-5 h-3 rounded-sm bg-gray-400" />삭제
          </button>
        </ContextMenu.Item>
      </ContextMenu>
    </>
  )
};

interface TodosProps {
  top?: number;
  itemWidth?: number;
  itemHeight?: number;
}

const Todos = ({ top = 0, itemWidth = 0, itemHeight = 0 }: TodosProps) => {
  const cells = useRef(Array(42).fill(0));
  const [activeId, setActiveId] = useState(-1);
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
    .toSorted((a, b) => {
      const diff = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();

      if (!diff) {
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      }

      return diff;
    });

  useEffect(() => {
    cells.current = Array(42).fill(0);
  });

  useEffect(() => {
    const reset = (e: MouseEvent) => {
      if ((e.target as HTMLDivElement).matches('.todo')) return;

      setActiveId(-1);
    };

    document.addEventListener('click', reset);

    return () => {
      document.removeEventListener('click', reset);
    };
  }, []);

  return (
    <div className="todos">
      {filteredTodos.map((todo) => (
        <Todo 
          key={todo.id} 
          top={top} 
          itemWidth={itemWidth} 
          itemHeight={itemHeight} 
          cells={cells}
          activeId={activeId}
          handleActive={setActiveId}
          {...todo}
        />
      ))}
    </div>
  );
};

export default React.memo(Todos);
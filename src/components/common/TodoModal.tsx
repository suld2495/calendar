import useCalendarStore from "@/store";
import { TodoForm, useTodoStore } from "@/store/todo";
import { displayFormatDate, formatDate } from "@/utils/date-utils";
import { IconArrowRight, IconCalendarWeekFilled, IconSquareX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import MiniCalendar from "../custom/mini-calendar/MiniCalendar";
import { useShallow } from "zustand/shallow";

const TodoModal = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [todo, clearForm, updateTodo] = useTodoStore(useShallow((state) => [
    state.todo, 
    state.clearForm,
    state.updateTodo,
  ]));
  const [ 
    startDate, 
    endDate, 
    isModal, 
    hideModal,
  ] = useCalendarStore((state) => [
    state.startDate, 
    state.endDate, 
    state.isModal, 
    state.hideModal,
  ]);

  const [form, setForm] = useState<TodoForm>({
    title: todo.title,
    startDate: todo.startDate || formatDate(startDate!),
    endDate: todo.endDate || formatDate(endDate!),
  });
  const [activeDate, setActiveDate] = useState<{ 
    type: 'startDate' | 'endDate', 
    date: Date,
    position?: { top: number; left: number },
  } | null>(null);

  const saveTodo = useTodoStore((state) => state.saveTodo);

  const handleChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title) {
      ref.current?.focus();
      alert('일정 제목을 입력해주세요.');
      return;
    }

    if (!form.startDate) {
      alert('시작일을 입력해주세요.');
      return;
    }

    if (!form.endDate) {
      form.endDate = form.startDate;
    }

    if (todo.id) {
      updateTodo({
        ...form,
        id: todo.id,
      });
    } else {
      saveTodo(form);
    }
    
    hide();
  };

  const handleClickDate = (date?: Date) => {
    if (!(date instanceof Date)) {
      setActiveDate(null);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [activeDate!.type]: formatDate(date),
    }));

    setActiveDate(null);
  };

  useEffect(() => {
    if (!ref.current || !isModal) return;

    ref.current.focus();
  }, [ref, isModal]);

  const hide = () => {
    clearForm();
    hideModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-xs"
        onClick={hide}
      />
      <form
        className="relative w-lg rounded-3xl z-10 bg-white py-5 px-8"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-end">
          <button className="text-xl cursor-pointer" onClick={hide}>
            <IconSquareX size={30} stroke={1} />
          </button>
        </div>
        <div className="mt-4 mb-5">
          <input 
            ref={ref}
            name="title"
            className="text-[26px] font-bold text-gray-700 placeholder:text-gray-300 outline-none"
            placeholder="일정 제목"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div className="flex gap-3 items-center text-[14px] mt-6 text-[#747474]">
          <IconCalendarWeekFilled size={22} stroke={1.5} />
          <span
            className="cursor-pointer"
            onClick={(e) => {
              const { x, y } = (e.target as HTMLDivElement).getBoundingClientRect();
              setActiveDate({
                type: 'startDate',
                date: form.startDate ? new Date(`${form.startDate} 00:00`) : new Date(),
                position: { top: y + 20, left: x },
              });
            }}
          >
            {displayFormatDate(new Date(form.startDate))}
          </span>
          <IconArrowRight size={15} />
          <span
            className="cursor-pointer"
            onClick={(e) => {
              const { x, y } = (e.target as HTMLDivElement).getBoundingClientRect();
              setActiveDate({
                type: 'endDate',
                date: form.endDate ? new Date(`${form.endDate} 00:00`) : new Date(),
                position: { top: y + 20, left: x },
              });
            }}
          >
            {displayFormatDate(new Date(form.endDate))}
          </span>
        </div>
        <div className="mt-8 flex justify-end gap-1">
          <button 
            className="py-[5px] px-[9px] border-[1px] border-gray-200 text-sm rounded-md cursor-pointer"
            onClick={hide}
          >
            취소
          </button>
          <button 
            type="submit"
            className="py-[5px] px-[9px] border-[1px] border-gray-200 text-sm rounded-md bg-blue-400 text-white cursor-pointer"
          >
            저장
          </button>
        </div>
        {activeDate && (
          <MiniCalendar
            {...activeDate}
            year={activeDate.date.getFullYear()}
            month={activeDate.date.getMonth()}
            date={activeDate.date}
            close={handleClickDate}
          />
        )}
      </form>
    </div>
  )
};

export default TodoModal;

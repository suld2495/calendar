import { useDateStore } from "@/store/date";

interface MonthButtonProps {
  children: React.ReactNode;
}

interface MonthButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const MonthButton = ({ onClick, children }: MonthButtonProps) => {

  return (
    <button 
      className="flex justify-center items-center px-3 h-7 border-[1px] border-blue-400 text-blue-400 rounded-md cursor-pointer text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  )
};

const CalendarHeader = () => {
  const { year, month, setToday, prev, next } = useDateStore();

  return (
    <div className="calendar-header flex items-center gap-10 py-10 pl-5">
      <div className="text-4xl font-bold">{year}.{String(month + 1).padStart(2, '0')}</div>
      <div className="flex gap-1">
        <MonthButton onClick={prev}>{"<"}</MonthButton>
        <MonthButton onClick={next}>{">"}</MonthButton>
        <MonthButton onClick={setToday}>오늘</MonthButton>
      </div>
    </div>
  )
}

export default CalendarHeader;
import CalendarContainer from "./CalendarContainer";
import { CalendarProvider, CellProvider } from "./CalendarProvider";

interface CalendarProps {
  ref: React.RefObject<HTMLDivElement | null>;
  className?: string;
  style?: Record<string, string>;
  year?: number;
  month?: number;
  cell?: (date: Date, current: boolean) => React.ReactNode;
  children?: React.ReactNode;
}

const Calendar = ({
  ref,
  className, 
  style, 
  year, 
  month, 
  cell,
  children,
}: CalendarProps) => {
  const today = new Date();
  year = year || today.getFullYear();
  month = month || today.getMonth();

  return (
    <CalendarProvider>
      <CellProvider>
        <CalendarContainer
          ref={ref}
          className={className} 
          year={year} 
          month={month} 
          cell={cell}
          style={style} 
        />
        {children}
      </CellProvider>
    </CalendarProvider>
  )
};

export default Calendar;

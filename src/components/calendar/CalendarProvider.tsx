import { useCallback, useMemo, useState } from "react";
import { CalendarContext, CellContext, CellContextProps } from "./context";

interface CalendarProviderProps {
  children: React.ReactNode;
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const startDrag = useCallback((date: Date) => {
    setIsDragging(true);
    setStartDate(date);
  }, []);

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  const moveDrag = useCallback((date: Date) => {
    if (!isDragging) return;

    setEndDate(date);
  }, [isDragging]);

  const value = useMemo(() => ({
    isDragging, startDate, endDate, startDrag, endDrag, moveDrag
  }), [isDragging, startDate, endDate, endDrag, moveDrag, startDrag]);

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};


interface CellProviderProps {
  children: React.ReactNode;
}

export const CellProvider = ({ children }: CellProviderProps) => {
  const [className, setClassName] = useState<CellContextProps['className']>();
  const [variant, setVariant] = useState<CellContextProps['variant']>();
  const [activeDate, setActiveDate] = useState<CellContextProps['activeDate']>();
  const [onClick, setOnClick] = useState<CellContextProps['onClick']>();
  const [onDragging, setOnDragging] = useState<CellContextProps['onDragging']>();
  const [onDragend, setOnDragend] = useState<CellContextProps['onDragend']>();

  const setCellOption = useCallback((option: Pick<CellContextProps, 'className' | 'variant' | 'activeDate' | 'onClick' | 'onDragging' | 'onDragend'>) => {
    setClassName(option.className);
    setVariant(option.variant);
    setActiveDate(option.activeDate);
    setOnClick(() => option.onClick);
    setOnDragging(() => option.onDragging);
    setOnDragend(() => option.onDragend);
  }, []);

  const value = useMemo(() => ({
    className, variant, activeDate, onClick, onDragging, onDragend, setCellOption
  }), [className, variant, activeDate, onClick, onDragging, onDragend, setCellOption]);

  return (
    <CellContext.Provider value={value}>
      {children}
    </CellContext.Provider>
  );
};


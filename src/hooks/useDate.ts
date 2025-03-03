import { useContextmenuStore } from "@/store/contextmenu";

export const useCell = (date: Date) => {
  const {
    startDate,
    endDate,
    isMouseDown,
    showContextmenu,
    setStartDate,
    setEndDate
  } = useContextmenuStore();

  let checked = false;

  if (startDate && endDate && isMouseDown) {
    const start = startDate > endDate ? endDate : startDate;
    const end = startDate > endDate ? startDate : endDate;
    checked = date >= start && date <= end;
  }

  const handleMouseDown = () => {
    setStartDate(date);
    setEndDate(date);
  };

  const handleMouseMove = () => {
    if (!isMouseDown) return;

    setEndDate(date);
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    showContextmenu(e.clientX, e.clientY);
    setEndDate(date);
  }

  return {
    checked,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
};
import useCalendarStore from "@/store";

export const useCell = (date: Date) => {
  const [
    startDate,
    endDate,
    isMouseDown,
    showContextmenu,
    setStartDate,
    setEndDate
  ] = useCalendarStore((state) => [
    state.startDate,
    state.endDate,
    state.isMouseDown,
    state.showContextmenu,
    state.setStartDate,
    state.setEndDate
  ]);

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
    const [width, height] = [200, 72];
    const { outerWidth, innerHeight } = window;
    const position = {
      x: e.clientX,
      y: e.clientY
    }

    if (outerWidth < e.clientX + width) {
      position.x -= width;
    }

    if (innerHeight < e.clientY + height) {
      position.y -= height;
    }

    showContextmenu(position.x, position.y);
    setEndDate(date);
  }

  return {
    checked,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
};
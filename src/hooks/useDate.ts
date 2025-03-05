import { useContextmenuStore } from "@/store/contextmenu";
import { useTodoStore } from "@/store/todo";

export const useCell = (date: Date) => {
  const { isMouseDown, showContextmenu, setIsMouseDown } =
    useContextmenuStore();
  const {
    form: { startDate, endDate },
    changeForm,
  } = useTodoStore();

  let checked = false;

  if (startDate && endDate) {
    const start = startDate > endDate ? endDate : startDate;
    const end = startDate > endDate ? startDate : endDate;
    checked = date >= new Date(start) && date <= new Date(end);
  }

  const handleMouseDown = () => {
    changeForm("startDate", date);
    changeForm("endDate", date);
    setIsMouseDown(true);
  };

  const handleMouseMove = () => {
    if (!isMouseDown) return;

    changeForm("endDate", date);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    showContextmenu(e.clientX, e.clientY);
    changeForm("endDate", date);
  };

  return {
    checked,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

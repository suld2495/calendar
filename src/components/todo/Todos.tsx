import useCalendarStore from "@/store";
import { useTodoStore } from "@/store/todo";
import { getDate } from "@/utils/date-utils";

const Todos = () => {
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


  console.log(filteredTodos)

  return (
    <div>
      {filteredTodos.map((todo) => (
        <div key={todo.id} className="absolute">
          <p>{todo.title}</p>
          <p>{todo.startDate}</p>
          <p>{todo.endDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Todos;
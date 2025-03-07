import './App.css'
import Calendar from './components/calendar/Calendar'
import TodoModal from './components/common/TodoModal';
import useCalendarStore from './store';

function App() {
  const [ year, month ] = useCalendarStore((state) => [state.year, state.month]);

  return (
    <>
      <Calendar year={year} month={month} />
      <TodoModal />
    </>
  )
}

export default App

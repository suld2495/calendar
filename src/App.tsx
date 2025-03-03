import './App.css'
import Calendar from './components/calendar/Calendar'
import TodoModal from './components/common/TodoModal';
import { useDateStore } from './store/date'

function App() {
  const { year, month } = useDateStore();

  return (
    <>
      <Calendar year={year} month={month} />
      <TodoModal />
    </>
  )
}

export default App

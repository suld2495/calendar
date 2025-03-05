import { useEffect } from 'react';
import './App.css'
import Calendar from './components/calendar/Calendar'
import TodoModal from './components/common/TodoModal';
import { useDateStore } from './store/date'
import { useTodoStore } from './store/todo';

function App() {
  const { year, month } = useDateStore();
  const { clearForm } = useTodoStore();

  useEffect(() => {
    clearForm();
  }, [clearForm]);

  return (
    <>
      <Calendar year={year} month={month} />
      <TodoModal />
    </>
  )
}

export default App

import './App.css'
import TodoModal from './components/common/TodoModal';
import FullCalendar from './components/custom/full-calendar/FullCalendar';
import Todos from './components/todo/Todos';
import useCalendarStore from './store';

function App() {
  const isModal = useCalendarStore((state) => state.isModal);

  return (
    <div className='bg-[#262626] h-full flex flex-col'>
      <FullCalendar />
      <Todos />
      {isModal && <TodoModal />}
    </div>
  )
}

export default App

import './App.css'
import TodoModal from './components/common/TodoModal';
import FullCalendar from './components/custom/full-calendar/FullCalendar';
import useCalendarStore from './store';

function App() {
  const isModal = useCalendarStore((state) => state.isModal);

  return (
    <div className='bg-[#262626] h-full flex flex-col'>
      <FullCalendar />
      {isModal && <TodoModal />}
    </div>
  )
}

export default App

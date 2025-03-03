import { useContextmenuStore } from "@/store/contextmenu";
import { useModalStore } from "@/store/modal";

const ContextMenu = () => {
  const { contextmenu, position, hideContextmenu } = useContextmenuStore();
  const { showModal } = useModalStore();

  if (!contextmenu) return null;

  const handleClick = () => {
    hideContextmenu();
    showModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full h-full z-11" onClick={hideContextmenu}></div>
      <div 
        className="shadow-2xl absolute top-0 left-0 w-50 p-4 bg-white rounded-2xl z-12"
        style={{ top: position.y, left: position.x }}
      >
        <button 
          className="flex w-full h-10 px-3 items-center gap-4 hover:bg-gray-200 transition-all rounded-md font-semibold cursor-pointer"
          onClick={handleClick}
        >
          <span className="block w-5 h-3 rounded-sm bg-red-400" />일정
        </button>
      </div>
    </div>
  )
};

export default ContextMenu;

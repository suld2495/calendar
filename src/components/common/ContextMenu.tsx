import useCalendarStore from "@/store";

interface ContextItemProps {
  onClick: () => void; 
}

const ContextItem = ({onClick}: ContextItemProps) => {
  return (
    <div 
      className="flex w-full h-10 px-3 hover:bg-gray-200 transition-all rounded-md"
      onClick={onClick}
    >
      <button className="flex items-center gap-4 font-semibold cursor-pointer">
        <span className="block w-5 h-3 rounded-sm bg-red-400" />일정
      </button>
    </div>
  )
};

interface ContextMenuProps {
  children: React.ReactNode;
}

const ContextMenu = ({ children }: ContextMenuProps) => {
  const [ 
    contextmenu, 
    position, 
    hideContextmenu,
  ] = useCalendarStore((state) => ([
    state.contextmenu,
    state.position,
    state.hideContextmenu,
    state.showModal,
  ]));

  if (!contextmenu) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-full h-full z-11" onClick={hideContextmenu}></div>
      <div 
        className="shadow-2xl absolute top-0 left-0 w-50 p-4 bg-white rounded-2xl z-12"
        style={{ top: position.y, left: position.x }}
      >
        {children}
      </div>
    </div>
  )
};

ContextMenu.Item = ContextItem

export default ContextMenu;

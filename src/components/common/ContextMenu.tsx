interface ContextItemProps {
  children: React.ReactNode; 
}

const ContextItem = ({ children }: ContextItemProps) => {
  return (
    <div 
      className="flex w-full h-10 px-3 hover:bg-gray-200 transition-all rounded-md"
    >
      {children}
    </div>
  )
};

interface ContextMenuProps {
  className?: string;
  isShow: boolean;
  position: { x: number; y: number };
  close: () => void;
  children: React.ReactNode;
}

const ContextMenu = ({
  className,
  isShow, 
  position, 
  close, 
  children 
}: ContextMenuProps) => {
  if (!isShow) return null;

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${className}`}>
      <div className="w-full h-full z-11" onClick={close}></div>
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

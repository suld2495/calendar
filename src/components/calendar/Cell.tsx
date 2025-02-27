interface CellProps {
  date: number;
  day: number;
  current?: boolean;
}

const Cell = ({ date, day, current = true }: CellProps) => {
  let color = '';

  if (!day) {
    color = 'text-red-500';
  }

  if (day === 6) {
    color = 'text-blue-500';
  }

  return (
    <div 
      className={`aspect-auto text-center pt-2 text-sm ${color} border-b-[1px] border-b-gray-200`}
    >
      <span className={`${!current ? 'opacity-40' : ''}`}>
        {date}
      </span>
    </div>
  );
};

export default Cell;

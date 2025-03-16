import { getToday } from "@/utils/date-utils";

interface MiniCellProps {
  date: Date;
  current: boolean;
  active: boolean;
}

const MiniCell = ({ date, active }: MiniCellProps) => {
  const today = getToday();

  return <div></div>
};

export default MiniCell;

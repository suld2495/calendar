export const getMonthWeekDay = (date: Date): [number, number] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const lastWeekDay = new Date(year, month, getLastDate(new Date(year, month + 1, 0))).getDay();

  return [firstWeekDay, lastWeekDay];
};

export const getLastDate = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export const formatDate = (date: Date): string => {
  if (!date) return '';

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export const displayFormatDate = (date: Date): string => {
  if (!date) return '';

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export const getToday = (): Date => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export const getDate = (date: string): Date => {
  const temp = new Date(date);
  return new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
}
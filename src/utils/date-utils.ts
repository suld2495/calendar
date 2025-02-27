export const getMonthWeekDay = (date: Date): [number, number] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const lastWeekDay = new Date(year, month, getLastDate(new Date(year, month + 1, 0))).getDay();

  return [firstWeekDay, lastWeekDay];
};

export const getLastDate = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}
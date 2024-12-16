export const getWeekRange = (date: Date): { start: string; end: string } => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday as the start
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
};

export const getNextWeek = (currentDate: Date): Date => {
  const nextWeek = new Date(currentDate);
  nextWeek.setDate(currentDate.getDate() + 7);
  return nextWeek;
};

export const getPreviousWeek = (currentDate: Date): Date => {
  const previousWeek = new Date(currentDate);
  previousWeek.setDate(currentDate.getDate() - 7);
  return previousWeek;
};

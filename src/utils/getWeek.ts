export function getWeekNumberFromISOString(date: string): number {
  const newYear = new Date(new Date(date).getFullYear(), 0, 1);
  let day = newYear.getDay() - 1;
  day = day >= 0 ? day : day + 7;
  const dayNumber: number =
    Math.floor(
      (new Date(date).getTime() -
        newYear.getTime() -
        (new Date(date).getTimezoneOffset() - newYear.getTimezoneOffset()) *
          60000) /
        86400000
    ) + 1;
  let weekNumber: number;

  if (day < 4) {
    weekNumber = Math.floor((dayNumber + day - 1) / 7) + 1;
    if (weekNumber > 52) {
      const nYear = new Date(new Date(date).getFullYear() + 1, 0, 1);
      let nday = nYear.getDay() - 1;
      nday = nday >= 0 ? nday : nday + 7;


      weekNumber = nday < 4 ? 1 : 53;
    }
  } else {
    weekNumber = Math.floor((dayNumber + day - 1) / 7);
  }
  return weekNumber;
}

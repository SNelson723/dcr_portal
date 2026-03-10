/**
 * @param isoStr date string formatted yyyy-mm-dd
 * @description Formats ISO date string fragment to mm/dd/yyyy for better readability and backend compatibility
 * @returns date string => mm/dd/yyyy
 */
export const formatDate = (isoStr: string) => {
  const split = isoStr.split("-");
  return `${parseInt(split[1])}/${split[2]}/${split[0]}`;
};

export const calcDayHours = (startTime: string, endTime: string) => {
  // Convert "HH:MM" to minutes since midnight
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // Handle overnight (end < start)
  const totalMinutes =
    endMinutes >= startMinutes
      ? endMinutes - startMinutes
      : 24 * 60 + endMinutes - startMinutes;

  const result =
    parseInt((totalMinutes / 60).toFixed(1)) > 0
      ? (totalMinutes / 60).toFixed(1)
      : "0";
  return result;
};

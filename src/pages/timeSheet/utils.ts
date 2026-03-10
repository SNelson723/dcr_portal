// Memorial Day is the last Monday of May
const calcMemorialDay = () => {
  // current year always
  const year = new Date().getFullYear();

  // Get the last day of May
  const mayLastDay = new Date(year, 4, 31);

  // dayOfWeek: 0 (Sun) to 6 (Sat). We want to find the last Monday, which is day 1.
  const dayOfWeek = mayLastDay.getDay();

  // Calculate the date of the last Monday
  const memorialDay = new Date(year, 4, 31 - ((dayOfWeek + 6) % 7));

  // Then format the date for display (MM/DD/YYYY)
  const split = memorialDay.toISOString().split("T")[0].split("-");
  const result = `${split[1]}/${split[2]}/${split[0]}`;
  return result;
};

const calcLaborDay = () => {
  const year = new Date().getFullYear();
  const septFirst = new Date(year, 8, 1);

  const dow = septFirst.getDay();
  const laborDay = new Date(year, 8, 1 + ((1 - dow + 7) % 7));

  const split = laborDay.toISOString().split("T")[0].split("-");
  const result = `${split[1]}/${split[2]}/${split[0]}`;
  return result;
};

const calculateThanksgiving = () => {
  const year = new Date().getFullYear();
  const novLastDay = new Date(year, 10, 30);
  const dayOfWeek = novLastDay.getDay();

  const thanksgiving = new Date(year, 10, 30 - ((dayOfWeek + 3) % 7));
  const blackFriday = new Date(year, 10, thanksgiving.getDate() + 1);

  const split = thanksgiving.toISOString().split("T")[0].split("-");
  const result = {
    thanksgiving: `${split[1]}/${split[2]}/${split[0]}`,
    blackFriday: `${split[1]}/${blackFriday.getDate()}/${split[0]}`,
  };
  return result;
};

export const allHolidays = () => {
  const year = new Date().getFullYear();

  return {
    newYearsDay: `01/01/${year + 1}`,
    memorialDay: calcMemorialDay(),
    independenceDay: `07/04/${year}`,
    laborDay: calcLaborDay(),
    thanksgiving: calculateThanksgiving().thanksgiving,
    blackFriday: calculateThanksgiving().blackFriday,
    christmasDay: `12/25/${year}`,
  };
};

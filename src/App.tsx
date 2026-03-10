import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { useNavigate, Outlet } from "react-router";

import type { WeekEnding } from "./interfaces/timesheet";
import { formatDate } from "./utils";
import {
  setDefaultSunday,
  setSelectedWeekEnding,
  setWeekEndings,
} from "./features/tsSlice";

import Login from "./pages/Login";
import NavBar from "./components/nav";
import TitleBar from "./components/titlebar";
import bg from "./assets/timesheet-bg.png";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ctx = useAppSelector((state) => state.app);

  // navigating back to root on app load to prevent landing on a non-existent route
  useEffect(() => {
    navigate("/");
  }, []);

  useEffect(() => {
    const today = new Date(); // today
    const year = new Date().getFullYear(); // current year
    const sundays: WeekEnding[] = []; // every sunday of the year
    const date = new Date(year, 0, 1); // this by default is first date of the year

    // advancing to the first Sunday of the year
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() + 1);
    }

    // Once the firstsunday of the year is found, we can increment weekly to speed up the process
    let defaultSundaySet = false;
    while (date.getFullYear() === year) {
      const formatted = formatDate(date.toISOString().split("T")[0]);
      sundays.push({ date: formatted });
      date.setDate(date.getDate() + 7);

      // check to see if today is before the current sunday
      if (today < date && !defaultSundaySet) {
        defaultSundaySet = true;
        const sunday = formatDate(date.toISOString().split("T")[0]);
        dispatch(setDefaultSunday(sunday));
        dispatch(setSelectedWeekEnding({ date: sunday }));
      }
    }

    dispatch(setWeekEndings(sundays));
  }, []);

  if (!ctx.isLoggedIn) return <Login />;

  return (
    <div>
      <NavBar />
      <TitleBar />
      <div className="ml-36 min-w-[calc(100vw-9rem)] max-w-[calc(100vw-9rem)] min-h-screen max-h-screen overflow-hidden p-4">
        <img
          src={bg}
          alt="Background"
          className="bg-cover bg-center absolute inset-0 z-0 min-w-[calc(100vw-9rem)] max-w-[calc(100vw-9rem)] min-h-screen max-h-screen overflow-hidden select-none cursor-default opacity-80 left-36"
        />
        <div style={{ zIndex: 1000 }} className="relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;

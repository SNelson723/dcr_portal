import { useAppSelector } from "../../../hooks";
import { allHolidays } from "../utils";

const Holidays = () => {
  const dob = useAppSelector((state) => state.user.dob);
  const ctx = allHolidays();

  const formatDob = () => {
    const date = dob.split("/");
    const year = new Date().getFullYear();
    return `${date[0]}/${date[1]}/${year}`;
  };

  return (
    <div className="bg-custom-white rounded-lg shadow-lg">
      <div className="bg-indigo-800 text-custom-white px-2 py-0.5 rounded-t-lg text-sm font-medium">Paid Holidays</div>
      <div className="p-2 grid grid-cols-2 gap-12 text-[15px] font-medium">
        <div className="grid">
          <div className="flex justify-between">
            <div>New Year's Day</div>
            <div>{ctx.newYearsDay}</div>
          </div>
          <div className="flex justify-between">
            <div>Memorial Day</div>
            <div>{ctx.memorialDay}</div>
          </div>
          <div className="flex justify-between">
            <div>Independence Day</div>
            <div>{ctx.independenceDay}</div>
          </div>
          <div className="flex justify-between">
            <div>Labor Day</div>
            <div>{ctx.laborDay}</div>
          </div>
        </div>
        <div className="grid">
          <div className="flex justify-between">
            <div>Thanksgiving</div>
            <div>{ctx.thanksgiving}</div>
          </div>
          <div className="flex justify-between">
            <div>Black Friday</div>
            <div>{ctx.blackFriday}</div>
          </div>
          <div className="flex justify-between">
            <div>Christmas Day</div>
            <div>{ctx.christmasDay}</div>
          </div>
          <div className="flex justify-between">
            <div>Your Birthday</div>
            <div>{formatDob()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;

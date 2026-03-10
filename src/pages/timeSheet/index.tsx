import { useAppSelector, useAppDispatch } from "../../hooks";
import SingleSelect from "../../components/inputs/SingleSelect";
import RowInputCard from "./RowInputCard";
import UserTitleCard from "./UserTitleCard";
import { setSelectedWeekEnding } from "../../features/tsSlice";
import DayCardList from "./DayCardList";

const TimeSheetPage = () => {
  const dispatch = useAppDispatch();
  const weekEndings = useAppSelector((state) => state.timesheet.weekEndings);

  const handleWESelect = (we: string | number) => {
    // dispatch(setSelectedWeekEnding(we.toString()));
    const selected = weekEndings.find((wk) => wk.date === we.toString());
    if (selected) {
      dispatch(setSelectedWeekEnding(selected));
    }
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] overflow-hidden grid grid-cols-[1fr_3fr] gap-4">
      <div className="flex flex-col gap-4">
        <UserTitleCard />
        <div className="bg-custom-white rounded-lg shadow-indigo-200/50 shadow-md p-2">
          <SingleSelect
            label="Week Ending"
            data={weekEndings}
            displayKey="date"
            valueKey="date"
            onSelect={handleWESelect}
          />
        </div>
        <RowInputCard />
      </div>
      <DayCardList />
    </div>
  );
};

export default TimeSheetPage;

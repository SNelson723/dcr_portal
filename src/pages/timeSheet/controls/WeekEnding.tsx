import { useTSCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import { setSelectedWeekEnding } from "../../../features/tsSlice";

import SingleSelect from "../../../components/inputs/SingleSelect";

const WeekEnding = () => {
  const ctx = useTSCtx();
  const dispatch = useAppDispatch();

  const handleWESelect = (we: string | number) => {
    const selected = ctx.weekEndings.find((wk) => wk.date === we.toString());
    if (selected) {
      dispatch(setSelectedWeekEnding(selected));
    }
  };

  return (
    <div className="bg-custom-white rounded-lg shadow-indigo-200/50 shadow-md p-2">
      <SingleSelect
        label="Week Ending"
        data={ctx.weekEndings}
        displayKey="date"
        valueKey="date"
        onSelect={handleWESelect}
      />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="btn-themeAmber">Export</button>
        <button className="btn-themeIndigo">Email</button>
      </div>
    </div>
  );
};

export default WeekEnding;

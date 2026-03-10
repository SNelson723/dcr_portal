import { useTSCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import { setRefresh, setSelectedWeekEnding } from "../../../features/tsSlice";

import SingleSelect from "../../../components/inputs/SingleSelect";

const WeekEnding = () => {
  const ctx = useTSCtx();
  const dispatch = useAppDispatch();

  const handleWESelect = (we: string | number) => {
    const selected = ctx.weekEndings.find((wk) => wk.date === we.toString());
    if (selected) {
      dispatch(setSelectedWeekEnding(selected));
      dispatch(setRefresh(true));
    }
  };

  return (
    <div className="bg-custom-white rounded-lg shadow-indigo-200/50 shadow-md">
      <div className="bg-indigo-800 text-custom-white px-2 py-0.5 rounded-t-lg text-sm font-medium">
        Week Ending
      </div>
      <div className="p-2">
        <SingleSelect
          label=""
          data={ctx.weekEndings}
          displayKey="date"
          valueKey="date"
          onSelect={handleWESelect}
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            className={`btn-themeAmber py-1.5 ${ctx.rowData.length ? "" : "opacity-50 pointer-events-none"}`}
          >
            Export
          </button>
          <button
            className={`btn-themeIndigo py-1.5 ${ctx.rowData.length ? "" : "opacity-50 pointer-events-none"}`}
          >
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekEnding;

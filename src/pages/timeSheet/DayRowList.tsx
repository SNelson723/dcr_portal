import { useAppSelector } from "../../hooks";
import { useTSCtx } from "./hooks";
import DayRow from "./DayRow";

const DayRowList = () => {
  const ctx = useTSCtx();
  const { rowData, totals } = useAppSelector((state) => state.timesheet);

  if (rowData.length === 0 && !totals) return null;

  const canEdit = () => {
    if (
      ctx.selectedWE &&
      new Date(ctx.selectedWE.date) >= new Date(ctx.defaultSunday)
    ) {
      return "";
    }
    return "pointer-events-none select-none";
  };
  return (
    <div className={`rounded-lg`}>
      {/* Column Headers */}
      <div
        className={`grid grid-cols-10 bg-indigo-800 text-custom-white rounded-t-lg py-0.5 font-medium`}
      >
        <div className="px-2 border-r">Date</div>
        <div className="px-2 border-r">Location</div>
        <div className="px-2 border-r">Call Type</div>
        <div className="px-2 border-r">Start</div>
        <div className="px-2 border-r">End</div>
        <div className="px-2 border-r">Site</div>
        <div className="px-2 border-r">Travel</div>
        <div className="px-2 border-r">Total</div>
        <div className="px-2 border-r">WO/SO #</div>
        <div className="px-2">Remarks</div>
      </div>

      {/* Day Rows Body */}
      <div
        className={`rounded-b-lg max-h-[50vh] overflow-hidden overflow-y-auto no-scrollbar ${canEdit()}`}
      >
        {rowData.map((row) => (
          <DayRow key={row.id} data={row} />
        ))}
      </div>

      {/* Totals Footer */}
      {totals ? (
        <div className={`grid grid-cols-10 text-content font-medium`}>
          <div className="col-span-5"></div>
          <div className="bg-custom-white px-2 text-right border-r border border-content rounded-bl-lg">
            {totals.site}
          </div>
          <div className="bg-custom-white px-2 text-right border-r border-y border-content">
            {totals.travel}
          </div>
          <div className="bg-custom-white px-2 text-right border-r border-y border-content rounded-br-lg">
            {totals.total}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DayRowList;

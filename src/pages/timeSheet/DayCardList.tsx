import { useAppSelector } from "../../hooks";
import DayCard from "./DayCard";

const DayCardList = () => {
  const rowData = useAppSelector((state) => state.timesheet.rowData);

  if (rowData.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {rowData.map((row) => (
        <DayCard key={row.work_date} data={row} />
      ))}
      <div className="bg-custom-white rounded-lg shadow-lg">Totals</div>
    </div>
  );
};

export default DayCardList;
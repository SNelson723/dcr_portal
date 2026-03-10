import { setSelectedDay } from "../../features/tsSlice";
import { useTSCtx } from "./hooks";
import { useAppDispatch } from "../../hooks";
import type { TSRowData } from "../../interfaces/timesheet";

interface DayCardProps {
  data: TSRowData;
}

const DayRow = ({ data }: DayCardProps) => {
  const ctx = useTSCtx();
  const dispatch = useAppDispatch();

  const handleDaySelect = (day: TSRowData) => {
    if (ctx.selectedDay && ctx.selectedDay.id === day.id) {
      dispatch(setSelectedDay(null));
    } else {
      dispatch(setSelectedDay(day));
    }
  };

  const bgColor = (id: number) => {
    if (ctx.selectedDay && ctx.selectedDay.id === id) {
      return "bg-amber-200 font-medium";
    }
    return "bg-custom-white odd:bg-indigo-200";
  };

  return (
    <div
      className={`${bgColor(data.id)} last:rounded-b-lg grid grid-cols-10 cursor-pointer hover:bg-indigo-100 transition-all duration-200 py-0.5`}
      onClick={() => handleDaySelect(data)}
    >
      <div className="px-2">{data.work_date}</div>
      <div className="px-2">{data.location}</div>
      <div className="px-2">{data.call_type}</div>
      <div className="px-2">{data.start_time}</div>
      <div className="px-2">{data.end_time}</div>
      <div className="text-right px-2">{data.site_time}</div>
      <div className="text-right px-2">{data.travel_time}</div>
      <div className="text-right px-2">{data.total_time}</div>
      <div className="px-2 text-nowrap truncate">{data.work_order}</div>
      <div className="px-2 text-nowrap truncate">{data.remarks}</div>
    </div>
  );
};

export default DayRow;

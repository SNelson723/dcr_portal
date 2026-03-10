import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { useToast } from "../../components/toasts/hooks/useToast";
import { useTSCtx } from "./hooks";
import type { JsonError } from "../../interfaces/jsonResp";
import {
  setRowData,
  setSelectedWeekEnding,
  setTSTotals,
} from "../../features/tsSlice";
import { getWeekEndingData } from "../../api/timesheet";

// Components
import UserTitleCard from "./UserTitleCard";
import SingleSelect from "../../components/inputs/SingleSelect";
import RowInputCard from "./RowInputCard";
import DayRowList from "./DayRowList";
import type { TSTotals, WEJsonResp } from "../../interfaces/timesheet";

const TimeSheetPage = () => {
  const ctx = useTSCtx();
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ctx.selectedWE) {
      dispatch(setRowData([]));
      dispatch(setTSTotals(null));
      
      getWeekEndingData(ctx.url, ctx.token, ctx.userid, ctx.selectedWE.date)
        .then((resp) => {
          const j: WEJsonResp = resp.data;
          if (j.error === 0 && j.week_days.length) {
            dispatch(setRowData(j.week_days));
            const totals: TSTotals = j.week_days.reduce(
              (acc, curr) => {
                acc.site += parseInt(curr.site_time);
                acc.travel += parseInt(curr.travel_time);
                acc.total += parseInt(curr.total_time);
                return acc;
              },
              {
                site: 0,
                travel: 0,
                total: 0,
              },
            );
            dispatch(setTSTotals(totals));
          }
        })
        .catch((err: JsonError) => toast.error(err.message));
    }
  }, [ctx.selectedWE]);

  const handleWESelect = (we: string | number) => {
    const selected = ctx.weekEndings.find((wk) => wk.date === we.toString());
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
            data={ctx.weekEndings}
            displayKey="date"
            valueKey="date"
            onSelect={handleWESelect}
          />
        </div>
        <RowInputCard />
      </div>
      <DayRowList />
    </div>
  );
};

export default TimeSheetPage;

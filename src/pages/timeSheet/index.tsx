import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { useToast } from "../../components/toasts/hooks/useToast";
import { useTSCtx } from "./hooks";
import type { JsonError } from "../../interfaces/jsonResp";
import { setRefresh, setRowData, setTSTotals } from "../../features/tsSlice";
import { getWeekEndingData } from "../../api/timesheet";

// Components
import UserTitleCard from "./controls/UserTitleCard";
import RowInputCard from "./controls/RowInputCard";
import DayRowList from "./DayRowList";
import type {
  TSRowData,
  TSTotals,
  WEJsonResp,
} from "../../interfaces/timesheet";
import WeekEnding from "./controls/WeekEnding";
import Holidays from "./controls/Holidays";

const TimeSheetPage = () => {
  const ctx = useTSCtx();
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ctx.selectedWE && ctx.refresh) {
      dispatch(setRowData([]));
      dispatch(setTSTotals(null));

      getWeekEndingData(ctx.url, ctx.token, ctx.userid, ctx.selectedWE.date)
        .then((resp) => {
          const j: WEJsonResp = resp.data;
          if (j.error === 0 && j.week_days.length) {
            const dates = new Set(j.week_days.map((d) => d.work_date));

            const datesArr = Array.from(dates).sort(
              (a, b) => new Date(a).getTime() - new Date(b).getTime(),
            );
            const sortedDays: TSRowData[] = [];

            datesArr.forEach((date) => {
              const filtered = [...j.week_days]
                .filter((d) => d.work_date === date)
                .sort((a, b) => {
                  const left = parseInt(a.start_time.replace(":", ""));
                  const right = parseInt(b.start_time.replace(":", ""));
                  return left - right;
                });
              sortedDays.push(...filtered);
            });

            dispatch(setRowData(sortedDays));
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
        .catch((err: JsonError) => toast.error(err.message))
        .finally(() => dispatch(setRefresh(false)));
    }
  }, [ctx.refresh, ctx.selectedWE]);

  return (
    <div className="min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] overflow-hidden space-y-4">
      <div className="grid grid-cols-[25%_25%_47.5%] gap-4">
        <UserTitleCard />
        <WeekEnding />
        <Holidays />
      </div>
      <div className={`grid grid-cols-[25%_73.7%] gap-4`}>
        <RowInputCard />
        <DayRowList />
      </div>
    </div>
  );
};

export default TimeSheetPage;

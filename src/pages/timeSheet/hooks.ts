import { useAppSelector } from "../../hooks";
import type { TSRowData } from "../../interfaces/timesheet";
import { calcDayHours } from "../../utils";

export const useTSCtx = () => {
  const {
    weekEndings,
    selectedWE,
    rowData,
    selectedDay,
    startTime,
    endTime,
    selectedActivity,
    currentDays,
    workOrder,
    remarks,
    travelTime,
    siteTime,
    selectedDate,
    callType,
    refresh,
  } = useAppSelector((state) => state.timesheet);
  const { userid } = useAppSelector((state) => state.user);
  const { url, token } = useAppSelector((state) => state.app);

  return {
    callType,
    currentDays,
    endTime,
    refresh,
    remarks,
    rowData,
    selectedActivity,
    selectedDate,
    selectedDay,
    selectedWE,
    siteTime,
    startTime,
    token,
    travelTime,
    url,
    userid,
    weekEndings,
    workOrder,
  };
};

export const useRowData = (rowId: number): TSRowData => {
  const ts = useAppSelector((state) => state.timesheet);
  const userid = useAppSelector((state) => state.user.userid);

  return {
    id: rowId,
    user_id: userid,
    week_ending: ts.selectedWE ? ts.selectedWE.date : "",
    work_date: ts.selectedDate,
    location: ts.selectedActivity,
    call_type: ts.callType,
    start_time: ts.startTime,
    end_time: ts.endTime,
    site_time: ts.siteTime || "0",
    travel_time: ts.travelTime || "0",
    total_time: calcDayHours(ts.startTime, ts.endTime),
    work_order: ts.workOrder,
    remarks: ts.remarks,
  };
};

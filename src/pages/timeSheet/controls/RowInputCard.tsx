import { useAppDispatch } from "../../../hooks";
import { useRowData, useTSCtx } from "../hooks";
import { useToast } from "../../../components/toasts/hooks/useToast";

import BasicInput from "../../../components/inputs/BasicInput";
import TimePicker from "../../../components/inputs/TimePicker";
import SingleSelect from "../../../components/inputs/SingleSelect";
import { calcDayHours } from "../../../utils";
import {
  resetTSInputs,
  setCallType,
  setEndTime,
  setRefresh,
  setRemarks,
  setSelectedActivity,
  setSelectedDate,
  setSiteTime,
  setStartTime,
  setTravelTime,
  setWorkOrder,
} from "../../../features/tsSlice";
import { activities, callTypes } from "../../../features";
import { addWeekDay, deleteDay, updateWeekDay } from "../../../api/timesheet";
import type { JsonError } from "../../../interfaces/jsonResp";

const RowInputCard = () => {
  const ctx = useTSCtx();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const rowData = useRowData(ctx.selectedDay ? ctx.selectedDay.id : 0);

  const showHours = () => {
    if (ctx.startTime && ctx.endTime) {
      return calcDayHours(ctx.startTime, ctx.endTime);
    }
    return "";
  };

  const handleStartTime = (time: string) => {
    dispatch(setStartTime(time));
  };

  const handleEndTime = (time: string) => {
    dispatch(setEndTime(time));
  };

  const handleLocationSelect = (location: string | number) => {
    dispatch(setSelectedActivity(location.toString()));
  };

  const handleCallTypeSelect = (ct: string | number) => {
    dispatch(setCallType(ct.toString()));
  };

  const allowEdit = () => {
    return true;
  };

  const handleTextChange = (x: string, action: string) => {
    if (action === "site") {
      dispatch(setSiteTime(x));
    } else if (action === "travel") {
      dispatch(setTravelTime(x));
    } else if (action === "workOrder") {
      dispatch(setWorkOrder(x));
    } else if (action === "remarks") {
      dispatch(setRemarks(x));
    }
  };

  const handleDateSelect = (date: string | number) => {
    dispatch(setSelectedDate(date.toString()));
  };

  const handleCrud = (type: "create" | "update" | "delete") => {
    if (type === "create") {
      // Call create API
      addWeekDay(ctx.url, ctx.token, ctx.userid, rowData)
        .then((resp) => {
          const j = resp.data;
          if (j.error === 0) {
            dispatch(setRefresh(true));
          }
        })
        .catch((err: JsonError) => toast.error(err.message));
    } else if (type === "update") {
      // Call update API
      updateWeekDay(ctx.url, ctx.token, ctx.userid, rowData)
        .then((resp) => {
          const j = resp.data;
          if (j.error === 0) {
            dispatch(setRefresh(true));
          }
        })
        .catch((err: JsonError) => toast.error(err.message));
    } else {
      // Call delete API
      deleteDay(ctx.url, ctx.token, rowData.id, ctx.userid)
        .then((resp) => {
          const j = resp.data;
          if (j.error === 0) {
            dispatch(setRefresh(true));
          }
        })
        .catch((err: JsonError) => toast.error(err.message));
    }
  };

  const handleClear = () => {
    dispatch(resetTSInputs());
  };

  const canSubmit = () => {
    if (
      ctx.selectedDate &&
      ctx.selectedActivity &&
      ctx.startTime &&
      ctx.endTime
    ) {
      return "";
    }
    return "opacity-50 pointer-events-none";
  };

  const canEdit = () => {
    if (ctx.selectedWE && new Date(ctx.selectedWE.date) >= new Date(ctx.defaultSunday)) {
      return ""
    }
    return "opacity-50 pointer-events-none select-none";
  };

  return (
    <div className="bg-custom-white rounded-lg shadow-indigo-200/50 shadow-md p-2">
      <div className="text-sm px-2 font-medium text-content/70">
        * indicates required fields
      </div>
      <div className={`grid gap-0.5 ${canEdit()}`}>
        <div className="grid grid-cols-2 gap-2 place-items-end">
          <SingleSelect
            id={1}
            label="Date *"
            data={ctx.currentDays}
            displayKey="date"
            valueKey="date"
            innerClass="py-1.5"
            secondaryDisplayKey="day"
            onSelect={handleDateSelect}
            defaultQuery={ctx.selectedDate}
            resetQuery={true}
            // className={`${!allowEdit() && "pointer-events-none opacity-50"}`}
          />
          <BasicInput
            label="Total Hours"
            text={showHours()}
            setText={() => {}}
            id={2}
            className="disabled pointer-events-none py-1.5"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 place-items-end">
          <SingleSelect
            label="Location *"
            data={activities}
            displayKey="label"
            valueKey="label"
            innerClass="py-1.5"
            onSelect={handleLocationSelect}
            defaultQuery={ctx.selectedActivity}
            resetQuery={true}
            className={`${!allowEdit() && "pointer-events-none opacity-50"}`}
            id={2}
          />
          <SingleSelect
            label="Call Type"
            data={callTypes}
            displayKey="value"
            valueKey="value"
            innerClass="py-1.5"
            onSelect={handleCallTypeSelect}
            defaultQuery={ctx.callType}
            resetQuery={true}
            className={`${!allowEdit() && "pointer-events-none opacity-50"}`}
            id={3}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TimePicker
            label="Start Time *"
            text={ctx.startTime.replace(/AM|PM/g, "")}
            setText={handleStartTime}
            id="start-time"
          />
          <TimePicker
            label="End Time *"
            text={ctx.endTime.replace(/AM|PM/g, "")}
            setText={handleEndTime}
            id="end-time"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <BasicInput
            label="Site Time"
            text={ctx.siteTime}
            setText={handleTextChange}
            action="site"
            id={5}
          />
          <BasicInput
            label="Travel Time"
            text={ctx.travelTime}
            setText={handleTextChange}
            action="travel"
            id={6}
          />
        </div>
        <BasicInput
          label="WO / SO #"
          text={ctx.workOrder}
          setText={handleTextChange}
          action="workOrder"
          id={7}
        />
        <BasicInput
          label="Remarks"
          text={ctx.remarks}
          setText={handleTextChange}
          action="remarks"
          id={8}
        />
        <div className="grid grid-cols-2 gap-2 mt-1.5">
          <button className="btn-themeAmber py-1.5" onClick={handleClear}>
            Clear
          </button>
          <button
            className={`btn-themeIndigo py-1.5 ${canSubmit()}`}
            onClick={() => handleCrud(ctx.selectedDay ? "update" : "create")}
          >
            {ctx.selectedDay ? "Update" : "Create"}
          </button>
          {ctx.selectedDay ? (
            <button
              className="btn-themeRose py-1.5 col-span-2"
              onClick={() => handleCrud("delete")}
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RowInputCard;

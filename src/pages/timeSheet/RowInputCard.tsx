import { useAppSelector, useAppDispatch } from "../../hooks";

import BasicInput from "../../components/inputs/BasicInput";
import TimePicker from "../../components/inputs/TimePicker";
import SingleSelect from "../../components/inputs/SingleSelect";
import { calcDayHours } from "../../utils";
import { setEndTime, setSelectedActivity, setStartTime } from "../../features/tsSlice";
import { activities } from "../../features";

const RowInputCard = () => {
  const dispatch = useAppDispatch();
  const ts = useAppSelector((state) => state.timesheet);

  const showHours = () => {
    if (ts.startTime && ts.endTime) {
      return calcDayHours(ts.startTime, ts.endTime);
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
    setSelectedActivity(location.toString());
  };  

  const allowEdit = () => {
    return true;
  };

  return (
    <div className="bg-custom-white rounded-lg shadow-indigo-200/50 shadow-md">
      <div className="bg-indigo-500 text-custom-white px-2 py-1 text-sm rounded-t-lg font-medium flex justify-between">
        <div>Editing (1/2/2026)</div>
        <div>W/E: (1/1/2026)</div>
      </div>
      <div className="grid gap-2 p-2">
        <div className="grid grid-cols-2 gap-2 place-items-end">
          <SingleSelect
            id={1}
            label="Date"
            data={ts.currentDays}
            displayKey="date"
            valueKey="date"
            innerClass="py-1.5"
            secondaryDisplayKey="day"
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
            label="Location"
            data={activities}
            displayKey="label"
            valueKey="label"
            innerClass="py-1.5"
            onSelect={handleLocationSelect}
            defaultQuery={ts.selectedActivity}
            resetQuery={true}
            className={`${!allowEdit() && "pointer-events-none opacity-50"}`}
            id={2}
          />
          <BasicInput label="Call Type" text="" setText={() => {}} id={4} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TimePicker
            label="Start Time"
            text={ts.startTime}
            setText={handleStartTime}
            id="start-time"
          />
          <TimePicker
            label="End Time"
            text={ts.endTime}
            setText={handleEndTime}
            id="end-time"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <BasicInput label="Site Time" text="" setText={() => {}} id={5} />
          <BasicInput label="Travel Time" text="" setText={() => {}} id={6} />
        </div>
        <BasicInput label="WO / SO #" text="" setText={() => {}} id={7} />
        <BasicInput label="Remarks" text="" setText={() => {}} id={8} />
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-themeAmber">Clear</button>
            <button className="btn-themeIndigo">Submit</button>
          </div>
      </div>
    </div>
  );
};

export default RowInputCard;

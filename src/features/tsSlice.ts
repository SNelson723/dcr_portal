import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  WeekEnding,
  CurrentDay,
  TSTotals,
  TSRowData,
} from "../interfaces/timesheet";
import { days } from ".";

interface TsState {
  // data handling
  weekEndings: WeekEnding[];
  defaultSunday: string;
  selectedWE: WeekEnding | null;
  rowData: TSRowData[];
  selectedDay: TSRowData | null;
  totals: TSTotals | null;
  currentDays: CurrentDay[];
  refresh: boolean;

  // input handling
  selectedDate: string;
  selectedActivity: string;
  startTime: string;
  endTime: string;
  siteTime: string;
  travelTime: string;
  callType: string;
  callTypeValue: string;
  workOrder: string;
  remarks: string;
}

const initialState: TsState = {
  weekEndings: [],
  defaultSunday: "",
  selectedWE: null,
  rowData: [],
  selectedDay: null,
  totals: null,
  currentDays: [],
  refresh: false,
  selectedDate: "",
  selectedActivity: "",
  startTime: "",
  endTime: "",
  siteTime: "",
  travelTime: "",
  callType: "",
  callTypeValue: "",
  workOrder: "",
  remarks: "",
};

const tsSlice = createSlice({
  name: "ts",
  initialState,
  reducers: {
    setWeekEndings: (state, action: PayloadAction<WeekEnding[]>) => {
      state.weekEndings = action.payload;
    },
    setDefaultSunday: (state, action: PayloadAction<string>) => {
      state.defaultSunday = action.payload;
    },
    setSelectedWE: (state, action: PayloadAction<WeekEnding>) => {
      state.selectedWE = action.payload;
      state.rowData = [];

      const sunday = new Date(action.payload.date);
      const currentWeek: CurrentDay[] = [];

      days.forEach((day, index) => {
        const targetDate = new Date(sunday);
        targetDate.setDate(sunday.getDate() - (6 - index));
        currentWeek.push({
          day,
          date: `${targetDate.getMonth() + 1}/${targetDate.getDate()}/${targetDate.getFullYear()}`,
        });
      });

      state.currentDays = currentWeek;
    },
    setTSTotals: (state, action: PayloadAction<TSTotals>) => {
      state.totals = action.payload;
    },
    setRefresh: (state, action: PayloadAction<boolean>) => {
      state.refresh = action.payload;
    },
    setSelectedDay: (state, action: PayloadAction<TSRowData>) => {
      state.selectedDay = action.payload;
    },
    addDay: (state, action: PayloadAction<TSRowData>) => {
      const days = [...state.rowData];
      days.push(action.payload);
      state.rowData = days.sort((a, b) =>
        a.work_date.localeCompare(b.work_date),
      );
    },
    removeDay: (state, action: PayloadAction<number>) => {
      state.rowData = state.rowData.filter((day) => day.id !== action.payload);
    },

    // for the inputs
    resetTSInputs: (state) => {
      state.selectedDate = "";
      state.selectedActivity = "";
      state.startTime = "08:30";
      state.endTime = "08:30";
      state.siteTime = "";
      state.travelTime = "";
      state.callType = "";
      state.callTypeValue = "";
      state.workOrder = "";
      state.remarks = "";
      state.selectedDay = null;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedWeekEnding: (state, action: PayloadAction<WeekEnding>) => {
      state.selectedWE = action.payload;
      state.currentDays = [];

      const sunday = new Date(action.payload.date);
      const currentWeek: CurrentDay[] = [];

      days.forEach((day, index) => {
        const targetDate = new Date(sunday);
        targetDate.setDate(sunday.getDate() - (6 - index));
        currentWeek.push({
          day,
          date: `${targetDate.getMonth() + 1}/${targetDate.getDate()}/${targetDate.getFullYear()}`,
        });
      });

      state.currentDays = currentWeek;
    },
    setSelectedActivity: (state, action: PayloadAction<string>) => {
      state.selectedActivity = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    setSiteTime: (state, action: PayloadAction<string>) => {
      state.siteTime = action.payload;
    },
    setTravelTime: (state, action: PayloadAction<string>) => {
      state.travelTime = action.payload;
    },
    setCallType: (state, action: PayloadAction<string>) => {
      state.callType = action.payload;
    },
    setCallTypeValue: (state, action: PayloadAction<string>) => {
      state.callTypeValue = action.payload;
    },
    setWorkOrder: (state, action: PayloadAction<string>) => {
      state.workOrder = action.payload;
    },
    setRemarks: (state, action: PayloadAction<string>) => {
      state.remarks = action.payload;
    },
    resetTSState: () => initialState,
  },
});

export const {
  addDay,
  removeDay,
  setDefaultSunday,
  setRefresh,
  setSelectedDay,
  setSelectedWE,
  setTSTotals,
  setWeekEndings,
  resetTSState,
  setSelectedDate,
  setSelectedActivity,
  setStartTime,
  setEndTime,
  setSiteTime,
  setTravelTime,
  setCallType,
  setCallTypeValue,
  setSelectedWeekEnding,
  setWorkOrder,
  setRemarks,
} = tsSlice.actions;
export default tsSlice.reducer;

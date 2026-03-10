export type CurrentDay = {
  day: string;
  date: string;
};

export type WeekEnding = {
  date: string;
};

export interface TSRowData {
  id: number;
  user_id: number;
  week_ending: string;
  work_date: string;
  location: string;
  call_type: string;
  start_time: string;
  end_time: string;
  site_time: string;
  travel_time: string;
  total_time: string;
  work_order: string;
  remarks: string | null;
}

export interface TSTotals {
  site: number;
  travel: number;
  total: number;
}

export interface WEJsonResp {
  error: number;
  success: boolean;
  week_days: TSRowData[];
}

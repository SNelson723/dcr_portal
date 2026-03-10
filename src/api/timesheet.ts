import axios from "axios";
import type { TSRowData } from "../interfaces/timesheet";

export const getWeekEndingData = async (
  url: string,
  token: string,
  user_id: number,
  week_ending: string,
) => {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    url: url + "timesheet/week_ending",
    params: {
      user_id,
      week_ending,
    },
  });

  return json;
};

export const addWeekDay = async (
  url: string,
  token: string,
  user_id: number,
  day: TSRowData,
) => {
  const json = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    url: url + "timesheet/add_day",
    data: {
      id: 0,
      user_id,
      week_ending: day.week_ending,
      work_date: day.work_date,
      location: day.location,
      call_type: day.call_type,
      start_time: day.start_time,
      end_time: day.end_time,
      site_time: parseFloat(day.site_time),
      travel_time: parseFloat(day.travel_time),
      total_time: parseFloat(day.total_time),
      work_order: day.work_order,
      remarks: day.remarks,
    },
  });

  return json;
};

export const updateWeekDay = async (
  url: string,
  token: string,
  user_id: number,
  day: TSRowData,
) => {
  const json = await axios({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    url: url + "timesheet/update_day",
    data: {
      id: day.id,
      user_id,
      week_ending: day.week_ending,
      work_date: day.work_date,
      location: day.location,
      call_type: day.call_type,
      start_time: day.start_time,
      end_time: day.end_time,
      site_time: parseFloat(day.site_time),
      travel_time: parseFloat(day.travel_time),
      total_time: parseFloat(day.total_time),
      work_order: day.work_order,
      remarks: day.remarks,
    },
  });

  return json;
};

export const deleteDay = async (
  url: string,
  token: string,
  id: number,
  user_id: number,
) => {
  const json = await axios({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    url: url + "timesheet/delete_day",
    params: {
      id,
      user_id,
    },
  });

  return json;
};

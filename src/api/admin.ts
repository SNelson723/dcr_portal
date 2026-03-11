import axios from "axios";
import type { Employee } from "../interfaces/jsonResp";

export const getAllEmployees = async (
  url: string,
  token: string,
  userid: number,
) => {
  const json = await axios({
    method: "GET",
    url: url + "admin/all_employees",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      userid,
    },
  });
  return json;
};

export const getEmployeeLevels = async (url: string, token: string) => {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + "admin/get_employee_levels",
  });
  return json;
};

export const createEmployee = async (
  url: string,
  token: string,
  user: Employee,
  password: string,
) => {
  const json = await axios({
    method: "POST",
    url: url + "admin/create_new_employee",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      firstname: user.firstname,
      lastname: user.lastname,
      userid: 0,
      role: user.role,
      dob: user.dob,
      employee_level: user.employee_level,
      dcr_email: user.dcr_email,
      password: password,
    },
  });
  return json;
};

export const updateEmployee = async (
  url: string,
  token: string,
  user: Employee,
) => {
  const json = await axios({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + "admin/update_employee",
    data: { ...user, password: "" },
  });
  return json;
};

export const removeEmployee = async (
  url: string,
  token: string,
  employee_id: number,
) => {
  const json = await axios({
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + `admin/remove_employee`,
    params: {
      employee_id,
    },
  });
  return json;
};

export const resetPWFlag = async (
  url: string,
  token: string,
  employee_id: number,
) => {
  const json = await axios({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + `admin/reset_password_flag`,
    data: {
      employee_id,
    },
  });
  return json;
};

export const resetSQFlag = async (
  url: string,
  token: string,
  employee_id: number,
) => {
  const json = await axios({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + `admin/reset_security_question_flag`,
    data: {
      employee_id,
    },
  });
  return json;
};

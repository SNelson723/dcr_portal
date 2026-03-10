import axios from "axios";
import type { User } from "../interfaces/jsonResp";

export const getAllEmployees = async (url: string, token: string) => {
  const json = await axios({
    method: "GET",
    url: url + "admin/all_employees",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return json;
};

export const createEmployee = async (
  url: string,
  token: string,
  user: User,
  username: string,
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
      is_admin: user.is_admin,
      dcr_email: user.email,
      password: password,
      username: username,
    },
  });
  return json;
};

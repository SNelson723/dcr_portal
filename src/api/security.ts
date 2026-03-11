import axios from "axios";

export const getSecurityQuestions = async (url: string, token: string) => {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + "employee/security_questions",
  });
  return json;
};

export const setSecurityAnswer = async (
  url: string,
  token: string,
  userid: number,
  question_id: number,
  answer: string,
) => {
  const json = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + "employee/create_or_update_security_answer",
    params: {
      userid,
      question_id,
      answer,
    },
  });
  return json;
};

export const validateEmployeeIdentity = async (
  url: string,
  token: string,
  email: string,
  dob: string,
  answer: string,
) => {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + "employee/validate_identity",
    params: {
      email,
      dob,
      answer,
    },
  });
  return json;
};

export const resetUserPassword = async (
  url: string,
  token: string,
  userid: number,
  password: string,
) => {
  const json = await axios({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: url + "employee/update_employee_password",
    params: {
      userid,
      password,
    },
  });
  return json;
};

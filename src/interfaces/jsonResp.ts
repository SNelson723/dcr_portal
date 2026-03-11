export type JsonError = {
  message: string;
};

export type User = {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  userid: number;
  employee_level: number;
  dob: string;
  password_reset: number;
  security_question_reset: number;
};

export interface LoginResp {
  access_token: string;
  error: number;
  success: boolean;
  token_type: string;
  user: User;
}

export interface Employee {
  userid: number;
  firstname: string;
  lastname: string;
  role: string;
  dcr_email: string;
  employee_level: number;
  dob: string;
  password_reset: number;
  security_question_reset: number;
  username: string;
}

export interface EmployeeListResp {
  error: number;
  success: boolean;
  employees: Employee[];
}

export type EmployeeLevel = {
  id: number;
  level: string;
}

export interface EmployeeLevelsResp {
  error: number;
  success: boolean;
  employee_levels: EmployeeLevel[];
}
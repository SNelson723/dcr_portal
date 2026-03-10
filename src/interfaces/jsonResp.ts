export type JsonError = {
  message: string;
};

export type User = {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  userid: number;
  is_admin: boolean;
  dob: string;
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
  is_admin: boolean;
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

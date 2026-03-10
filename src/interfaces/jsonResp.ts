export type JsonError = {
  message: string;
};

export type UserLoginResp = {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  userid: number;
  is_admin: boolean;
};

export interface LoginResp {
  access_token: string;
  error: number;
  success: boolean;
  token_type: string;
  user: UserLoginResp;
}

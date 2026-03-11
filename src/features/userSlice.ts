import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../interfaces/jsonResp";

interface UserState {
  emailInput: string;
  pwInput: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userid: number;
  isAdmin: boolean;
  dob: string;
  password_reset: number;
  security_question_reset: number;
}

const initialState: UserState = {
  emailInput: "",
  pwInput: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  userid: 0,
  isAdmin: false,
  dob: "",
  password_reset: 0,
  security_question_reset: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmailInput: (state, action: PayloadAction<string>) => {
      state.emailInput = action.payload;
    },
    setPwInput: (state, action: PayloadAction<string>) => {
      state.pwInput = action.payload;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      const { email, firstname, lastname, role, userid, is_admin, dob, password_reset, security_question_reset } =
        action.payload;
      state.email = email;
      state.firstName = firstname;
      state.lastName = lastname;
      state.role = role;
      state.userid = userid;
      state.isAdmin = is_admin;
      state.dob = dob;
      state.password_reset = password_reset;
      state.security_question_reset = security_question_reset;
    },
    resetUserState: () => initialState,
  },
});

export const { setEmailInput, setPwInput, setUserData, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;

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
  employeeLevel: number;
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
  employeeLevel: 0,
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
      const {
        email,
        firstname,
        lastname,
        role,
        userid,
        employee_level,
        dob,
        password_reset,
        security_question_reset,
      } = action.payload;
      state.email = email;
      state.firstName = firstname;
      state.lastName = lastname;
      state.role = role;
      state.userid = userid;
      state.employeeLevel = employee_level;
      state.dob = dob;
      state.password_reset = password_reset;
      state.security_question_reset = security_question_reset;
    },
    setPWReset: (state, action: PayloadAction<number>) => {
      state.password_reset = action.payload;
    },
    setSQReset: (state, action: PayloadAction<number>) => {
      state.security_question_reset = action.payload;
    },
    resetUserState: () => initialState,
  },
});

export const {
  setEmailInput,
  setPwInput,
  setUserData,
  setPWReset,
  setSQReset,
  resetUserState,
} = userSlice.actions;
export default userSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserLoginResp } from "../interfaces/jsonResp";

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
    setUserData: (state, action: PayloadAction<UserLoginResp>) => {
      const { email, firstname, lastname, role, userid, is_admin, dob } =
        action.payload;
      state.email = email;
      state.firstName = firstname;
      state.lastName = lastname;
      state.role = role;
      state.userid = userid;
      state.isAdmin = is_admin;
      state.dob = dob
    },
    resetUserState: () => initialState,
  },
});

export const { setEmailInput, setPwInput, setUserData, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;

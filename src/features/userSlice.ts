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
      const { email, firstname, lastname, role, userid, is_admin } =
        action.payload;
      state.email = email;
      state.firstName = firstname;
      state.lastName = lastname;
      state.role = role;
      state.userid = userid;
      state.isAdmin = is_admin;
    },
    resetUserState: () => initialState,
  },
});

export const { setEmailInput, setPwInput, setUserData, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;

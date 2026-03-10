import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  url: string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: AppState = {
  url: "http://127.0.0.1:5000/",
  token: "",
  isLoggedIn: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetAppState: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export const { setIsLoggedIn, setToken, resetAppState } = appSlice.actions;
export default appSlice.reducer;

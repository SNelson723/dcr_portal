import { configureStore } from "@reduxjs/toolkit";

// imported REDUCERS
import appReducer from "../features/appSlice";
import navReducer from "../features/navSlice";
import userReducer from "../features/userSlice";
import tsReducer from "../features/tsSlice";
import adminReducer from "../features/adminSlice";

export const setupStore = () =>
  configureStore({
    reducer: {
      app: appReducer,
      nav: navReducer,
      user: userReducer,
      timesheet: tsReducer,
      admin: adminReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof setupStore>["getState"]>;
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"];

export const store = setupStore();

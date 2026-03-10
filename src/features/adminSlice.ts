import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../interfaces/jsonResp";

type MainForm = 0 | 1 | 2 | 3 | 4 | 5;

interface AdminState {
  mainForm: MainForm;
  employees: Employee[];
  employeeInfo: Employee;
}

const defaultEmployee: Employee = {
  userid: 0,
  firstname: "",
  lastname: "",
  role: "",
  dcr_email: "",
  is_admin: false,
  dob: "",
  password_reset: 0,
  security_question_reset: 0,
};

const initialState: AdminState = {
  mainForm: 0,
  employees: [],
  employeeInfo: defaultEmployee,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setMainForm(state, action: PayloadAction<MainForm>) {
      state.mainForm = action.payload;
    },
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    setEmployeeInfo: (state, action: PayloadAction<Employee>) => {
      state.employeeInfo = action.payload;
    },
    setEmployeeInfoField: (
      state,
      action: PayloadAction<{
        field: keyof Employee;
        value: string | number | boolean;
      }>,
    ) => {
      const { field, value } = action.payload;
      state.employeeInfo[field] = value as never;
    },
    resetEmployeeInfo: (state) => {
      state.employeeInfo = defaultEmployee;
    },
    resetAdminState: () => initialState,
  },
});

export const {
  setMainForm,
  setEmployees,
  setEmployeeInfo,
  setEmployeeInfoField,
  resetEmployeeInfo,
  resetAdminState,
} = adminSlice.actions;
export default adminSlice.reducer;

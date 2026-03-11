import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee, EmployeeLevel } from "../interfaces/jsonResp";

export type MainForm = 0 | 1 | 2 | 3 | 4 | 5;

interface AdminState {
  mainForm: MainForm;
  employees: Employee[];
  employeeInfo: Employee;
  adminRefresh: boolean;
  pw: string;
  pwConfirm: string;
  selectedEmployee: Employee | null;
  employeeLevels: EmployeeLevel[];
  isRemovingEmployee: boolean;
}

const defaultEmployee: Employee = {
  userid: 0,
  firstname: "",
  lastname: "",
  role: "",
  dcr_email: "",
  employee_level: 0,
  dob: "",
  password_reset: 0,
  security_question_reset: 0,
  username: "",
};

const initialState: AdminState = {
  mainForm: 0,
  employees: [],
  employeeInfo: defaultEmployee,
  adminRefresh: true,
  pw: "",
  pwConfirm: "",
  selectedEmployee: defaultEmployee,
  employeeLevels: [],
  isRemovingEmployee: false,
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
    setAdminRefresh: (state, action: PayloadAction<boolean>) => {
      state.adminRefresh = action.payload;
    },
    setPw: (state, action: PayloadAction<string>) => {
      state.pw = action.payload;
    },
    setPwConfirm: (state, action: PayloadAction<string>) => {
      state.pwConfirm = action.payload;
    },
    setSelectedEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },
    setEmployeeLevels: (state, action: PayloadAction<EmployeeLevel[]>) => { 
      state.employeeLevels = action.payload;
    },
    setIsRemovingEmployee: (state, action: PayloadAction<boolean>) => {
      state.isRemovingEmployee = action.payload;
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
  setAdminRefresh,
  setPw,
  setPwConfirm,
  setSelectedEmployee,
  setIsRemovingEmployee,
  setEmployeeLevels,
} = adminSlice.actions;
export default adminSlice.reducer;

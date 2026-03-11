import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SecurityQuestion } from "../interfaces/security";

interface SecurityState {
  questions: SecurityQuestion[];
  answer: string;
  selectedQuestionId: number;
  newPwd: string;
  newPwdConfirm: string;
  isValidatingSQ: boolean;
  resetSQModalOpen: boolean;
  resetPWModalOpen: boolean;
  validateEmail: string;
  validateDOB: string;
  forgotPWFlag: boolean;
}

const initialState: SecurityState = {
  questions: [],
  answer: "",
  selectedQuestionId: 0,
  newPwd: "",
  newPwdConfirm: "",
  isValidatingSQ: false,
  resetSQModalOpen: false,
  resetPWModalOpen: false,
  validateEmail: "",
  validateDOB: "",
  forgotPWFlag: false,
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<SecurityQuestion[]>) => {
      state.questions = action.payload;
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload;
    },
    setSelectedQuestionId: (state, action: PayloadAction<number>) => {
      state.selectedQuestionId = action.payload;
    },
    setNewPwd: (state, action: PayloadAction<string>) => {
      state.newPwd = action.payload;
    },
    setNewPwdConfirm: (state, action: PayloadAction<string>) => {
      state.newPwdConfirm = action.payload;
    },
    setResetSQModalOpen: (state, action: PayloadAction<boolean>) => {
      state.resetSQModalOpen = action.payload;
    },
    setResetPWModalOpen: (state, action: PayloadAction<boolean>) => {
      state.resetPWModalOpen = action.payload;
    },
    setIsValidingSQ: (state, action: PayloadAction<boolean>) => {
      state.isValidatingSQ = action.payload;
    },
    setValidateEmail: (state, action: PayloadAction<string>) => {
      state.validateEmail = action.payload;
    },
    setValidateDOB: (state, action: PayloadAction<string>) => {
      state.validateDOB = action.payload;
    },
    setForgotPWFlag: (state, action: PayloadAction<boolean>) => {
      state.forgotPWFlag = action.payload;
    },
    resetSecurityState: () => initialState,
  },
});

export const {
  setQuestions,
  setAnswer,
  setSelectedQuestionId,
  setNewPwd,
  setNewPwdConfirm,
  resetSecurityState,
  setResetPWModalOpen,
  setResetSQModalOpen,
  setIsValidingSQ,
  setValidateDOB,
  setValidateEmail,
  setForgotPWFlag,
} = securitySlice.actions;
export default securitySlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SecurityQuestion } from "../interfaces/security";

interface SecurityState {
  questions: SecurityQuestion[];
  answer: string;
  selectedQuestionId: number;
  newPwd: string;
  newPwdConfirm: string;
}

const initialState: SecurityState = {
  questions: [],
  answer: "",
  selectedQuestionId: 0,
  newPwd: "",
  newPwdConfirm: "",
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
} = securitySlice.actions;
export default securitySlice.reducer;

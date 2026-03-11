export type SecurityQuestion = {
  id: number;
  question: string;
};

export interface SQJsonResp {
  error: number;
  success: boolean;
  security_questions: SecurityQuestion[];
}

export interface SQValidateJsonResp {
  error: number;
  success: boolean;
  msg: string;
}

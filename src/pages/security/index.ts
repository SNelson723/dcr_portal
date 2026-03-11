import { useAppSelector } from "../../hooks";

export const useSecurityCtx = () => {
  const {
    questions,
    answer,
    selectedQuestionId,
    newPwd,
    newPwdConfirm,
    resetPWModalOpen,
    resetSQModalOpen,
    isValidatingSQ,
    validateDOB,
    validateEmail,
    forgotPWFlag,
  } = useAppSelector((state) => state.security);
  const { userid, password_reset, security_question_reset } = useAppSelector(
    (state) => state.user,
  );
  const { url, token } = useAppSelector((state) => state.app);

  return {
    answer,
    forgotPWFlag,
    isValidatingSQ,
    newPwd,
    newPwdConfirm,
    password_reset,
    questions,
    resetPWModalOpen,
    resetSQModalOpen,
    security_question_reset,
    selectedQuestionId,
    token,
    url,
    userid,
    validateDOB,
    validateEmail,
  };
};

import { useAppSelector } from "../../hooks";

export const useSecurityCtx = () => {
  const { questions, answer, selectedQuestionId, newPwd, newPwdConfirm } =
    useAppSelector((state) => state.security);
  const userid = useAppSelector((state) => state.user.userid);

  return {
    answer,
    newPwd,
    newPwdConfirm,
    questions,
    selectedQuestionId,
    userid,
  };
};

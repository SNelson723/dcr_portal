import { useEffect } from "react";
import { useToast } from "../../components/toasts/hooks/useToast";
import { useSecurityCtx } from ".";
import { useAppDispatch } from "../../hooks";
import {
  setAnswer,
  setQuestions,
  setResetPWModalOpen,
  setResetSQModalOpen,
  setSelectedQuestionId,
} from "../../features/securitySlice";

import GenericModal from "../../components/modal/GenericModal";
import BasicInput from "../../components/inputs/BasicInput";
import SingleSelect from "../../components/inputs/SingleSelect";
import { getSecurityQuestions, setSecurityAnswer } from "../../api/security";
import type { JsonError } from "../../interfaces/jsonResp";
import type { SQJsonResp } from "../../interfaces/security";
import { setIsLoggedIn } from "../../features/appSlice";
import { setSQReset } from "../../features/userSlice";

const SecurityQuestion = () => {
  const ctx = useSecurityCtx();
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ctx.token) {
      getSecurityQuestions(ctx.url, ctx.token)
        .then((resp) => {
          const j: SQJsonResp = resp.data;
          if (j.error === 0) {
            dispatch(setQuestions(j.security_questions));
          }
        })
        .catch((err: JsonError) => toast.error(err.message));
    }
  }, [ctx.token]);

  const handleClose = () => {
    dispatch(setResetSQModalOpen(false));
  };

  const handleSubmit = () => {
    setSecurityAnswer(
      ctx.url,
      ctx.token,
      ctx.userid,
      ctx.selectedQuestionId,
      ctx.answer,
    )
      .then((resp) => {
        const j = resp.data;
        if (j.error === 0) {
          dispatch(setSQReset(0));
          if (ctx.password_reset === 1) {
            // set the password reset modal open
            dispatch(setResetPWModalOpen(true));
          } else {
            // go ahead and log in
            dispatch(setIsLoggedIn(true));
          }
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  const handleSQSelect = (id: number | string) => {
    if (ctx.selectedQuestionId === Number(id)) {
      dispatch(setSelectedQuestionId(0));
    } else {
      dispatch(setSelectedQuestionId(Number(id)));
    }
  };

  const canSubmit = () => {
    if (ctx.selectedQuestionId && ctx.answer.length > 0) {
      return "";
    }
    return "opacity-50 pointer-events-none";
  };

  const defaultQuery = () => {
    if (!ctx.selectedQuestionId) {
      return "";
    }
    const selected = ctx.questions.filter(
      (q) => q.id === ctx.selectedQuestionId,
    )[0];
    return selected.question;
  };

  const handleAnswerInput = (x: string, a: string) => {
    if (a === "answer") {
      dispatch(setAnswer(x));
    }
  };

  return (
    <GenericModal
      isOpen={ctx.resetSQModalOpen}
      onClose={handleClose}
      allowClickOutside={false}
      modalClassName="p-2 space-y-2 w-[24vw]"
    >
      <div className="text-sm font-medium text-center">
        <div>Please select a Security Question</div>
        <div>and provide your answer</div>
      </div>
      <SingleSelect
        label="Questions"
        data={ctx.questions}
        displayKey="question"
        valueKey="id"
        onSelect={handleSQSelect}
        defaultQuery={defaultQuery()}
        defaultValue={ctx.selectedQuestionId}
        innerClass="pointer-events-none"
      />
      <BasicInput
        id={1}
        label="Answer"
        text={ctx.answer}
        setText={handleAnswerInput}
        action="answer"
      />
      <button
        className={`btn-themeIndigo w-full ${canSubmit()}`}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </GenericModal>
  );
};

export default SecurityQuestion;

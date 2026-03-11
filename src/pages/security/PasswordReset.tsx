import { useSecurityCtx } from ".";
import { useAppDispatch } from "../../hooks";
import { useToast } from "../../components/toasts/hooks/useToast";
import {
  setAnswer,
  setForgotPWFlag,
  setIsValidingSQ,
  setNewPwd,
  setNewPwdConfirm,
  setResetPWModalOpen,
  setValidateDOB,
  setValidateEmail,
} from "../../features/securitySlice";

import GenericModal from "../../components/modal/GenericModal";
import PWInput from "../../components/inputs/PWInput";
import {
  resetUserPassword,
  validateEmployeeIdentity,
} from "../../api/security";
import type { JsonError } from "../../interfaces/jsonResp";
import { setIsLoggedIn } from "../../features/appSlice";
import { setSQReset } from "../../features/userSlice";
import BasicInput from "../../components/inputs/BasicInput";

const PasswordReset = () => {
  const ctx = useSecurityCtx();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setResetPWModalOpen(false));
    dispatch(setForgotPWFlag(false));
  };

  const canSubmit = () => {
    if (
      ctx.newPwd === "" ||
      ctx.newPwdConfirm === "" ||
      ctx.newPwd !== ctx.newPwdConfirm
    ) {
      return "pointer-events-none opacity-50";
    }
    return "";
  };

  const handlePWChange = (x: string) => {
    dispatch(setNewPwd(x));
  };

  const handlePWConfirmChange = (x: string) => {
    dispatch(setNewPwdConfirm(x));
  };

  const handlePwSubmit = () => {
    resetUserPassword(ctx.url, ctx.token, ctx.userid, ctx.newPwd)
      .then((resp) => {
        const j = resp.data;
        if (j.error === 0) {
          toast.success("Password reset successful");
          dispatch(setSQReset(0));
          dispatch(setIsLoggedIn(true));
          handleClose();
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  const handleValidation = () => {
    validateEmployeeIdentity(
      ctx.url,
      ctx.token,
      ctx.validateEmail,
      ctx.validateDOB,
      ctx.answer,
    )
      .then((resp) => {
        const j = resp.data;
        if (j.error === 0) {
          toast.success("Identity validated, please reset your password");
          dispatch(setIsValidingSQ(false));
          dispatch(setValidateDOB(""));
          dispatch(setValidateEmail(""));
          dispatch(setAnswer(""));
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  const handleValidateTextChange = (text: string, action: string) => {
    if (action === "email") {
      dispatch(setValidateEmail(text));
    } else if (action === "dob") {
      dispatch(setValidateDOB(text));
    } else {
      dispatch(setAnswer(text));
    }
  };

  const canValidate = () => {
    if (
      ctx.answer === "" ||
      ctx.validateDOB === "" ||
      ctx.validateEmail === ""
    ) {
      return "pointer-events-none opacity-50";
    }
    return "";
  };

  return (
    <GenericModal
      isOpen={ctx.resetPWModalOpen}
      onClose={handleClose}
      allowClickOutside={ctx.forgotPWFlag}
      modalClassName="p-2 space-y-2 w-[24vw]"
    >
      {!ctx.isValidatingSQ ? (
        <>
          <div className="text-sm font-medium text-center">
            Please reset your password
          </div>
          <PWInput
            label="New Password"
            name="password"
            text={ctx.newPwd}
            setText={handlePWChange}
            isConfirming={true}
            leftCompare={ctx.newPwd}
            rightCompare={ctx.newPwdConfirm}
          />
          <PWInput
            label="Confirm New Password"
            name="confirm_password"
            text={ctx.newPwdConfirm}
            setText={handlePWConfirmChange}
            isConfirming={true}
            leftCompare={ctx.newPwd}
            rightCompare={ctx.newPwdConfirm}
          />
          <button
            className={`btn-themeIndigo w-full ${canSubmit()}`}
            onClick={handlePwSubmit}
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <div className="text-sm font-medium text-center">
            Please verify your identity
          </div>
          <BasicInput
            id={2}
            label="Email"
            text={ctx.validateEmail}
            setText={handleValidateTextChange}
            action="email"
          />
          <BasicInput
            id={3}
            label="Date of Birth - MM/DD/YYYY"
            text={ctx.validateDOB}
            setText={handleValidateTextChange}
            action="dob"
          />
          <BasicInput
            id={4}
            label="Security Question Answer"
            text={ctx.answer}
            setText={handleValidateTextChange}
            action="answer"
          />
          <button
            className={`btn-themeIndigo w-full ${canValidate()}`}
            onClick={handleValidation}
          >
            Submit
          </button>
        </>
      )}
    </GenericModal>
  );
};

export default PasswordReset;

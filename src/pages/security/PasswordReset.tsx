import { useSecurityCtx } from ".";
import { useAppDispatch } from "../../hooks";
import { useToast } from "../../components/toasts/hooks/useToast";
import {
  setNewPwd,
  setNewPwdConfirm,
  setResetPWModalOpen,
} from "../../features/securitySlice";

import GenericModal from "../../components/modal/GenericModal";
import PWInput from "../../components/inputs/PWInput";
import { resetUserPassword } from "../../api/security";
import type { JsonError } from "../../interfaces/jsonResp";
import { setIsLoggedIn } from "../../features/appSlice";
import { setSQReset } from "../../features/userSlice";

const PasswordReset = () => {
  const ctx = useSecurityCtx();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setResetPWModalOpen(false));
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
          dispatch(setResetPWModalOpen(false));
          dispatch(setIsLoggedIn(true));
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  return (
    <GenericModal
      isOpen={ctx.resetPWModalOpen}
      onClose={handleClose}
      allowClickOutside={false}
      modalClassName="p-2 space-y-2 w-[24vw]"
    >
      <div className="text-sm font-medium text-center">
        Please reset your password
      </div>
      <PWInput
        label="New Password"
        name="password"
        text={ctx.newPwd}
        setText={handlePWChange}
      />
      <PWInput
        label="Confirm New Password"
        name="confirm_password"
        text={ctx.newPwdConfirm}
        setText={handlePWConfirmChange}
      />
      <button
        className={`btn-themeIndigo w-full ${canSubmit()}`}
        onClick={handlePwSubmit}
      >
        Submit
      </button>
    </GenericModal>
  );
};

export default PasswordReset;

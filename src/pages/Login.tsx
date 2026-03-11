import { useAppSelector, useAppDispatch } from "../hooks";
import { useToast } from "../components/toasts/hooks/useToast";

// Logos and Components
import bg from "../assets/login-background.png";
import logo from "../assets/dcr-logo.png";
import BasicInput from "../components/inputs/BasicInput";
import PWInput from "../components/inputs/PWInput";
import { setEmailInput, setPwInput, setUserData } from "../features/userSlice";
import { login } from "../api/login";
import type { JsonError, LoginResp } from "../interfaces/jsonResp";
import { setIsLoggedIn, setToken } from "../features/appSlice";
import {
  setForgotPWFlag,
  setIsValidingSQ,
  setResetPWModalOpen,
  setResetSQModalOpen,
} from "../features/securitySlice";
import SecurityQuestion from "./security/SecurityQuestion";
import PasswordReset from "./security/PasswordReset";

const Login = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { url } = useAppSelector((state) => state.app);
  const { emailInput, pwInput } = useAppSelector((state) => state.user);

  const handleTextChange = (text: string, action: string) => {
    if (action === "email") {
      dispatch(setEmailInput(text));
    } else {
      dispatch(setPwInput(text));
    }
  };

  const handleLogin = () => {
    login(url, emailInput, pwInput)
      .then((resp) => {
        const j: LoginResp = resp.data;
        if (j.error === 0) {
          // Setting the user info since the token and user id will be needed
          // for potential password/security question reset flows
          dispatch(setToken(j.access_token));
          dispatch(setUserData(j.user));

          if (
            j.user.password_reset === 0 &&
            j.user.security_question_reset === 0
          ) {
            // If neither reset is required, we can just log in as normal
            dispatch(setIsLoggedIn(true));
          } else if (j.user.security_question_reset === 1) {
            // We'll start with security question first
            // Then after this process, we'll check to see
            // if the password needs to be reset as well
            // If not => we can just log in as normal after security question reset
            dispatch(setResetSQModalOpen(true));
          } else if (j.user.password_reset === 1) {
            // If security question doesn't need to be reset, but password does
            // We just skip the security question process and go straight to password reset
            // After resetting password, we can log in as normal
            dispatch(setResetPWModalOpen(true));
          }
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleForgotPWClick = () => {
    dispatch(setForgotPWFlag(true));
    dispatch(setIsValidingSQ(true));
    dispatch(setResetPWModalOpen(true));
  };

  return (
    <div className="bg-bkg h-screen w-screen flex justify-center items-center">
      <SecurityQuestion />
      <PasswordReset />
      <img
        src={bg}
        draggable={false}
        className="bg-cover bg-center absolute inset-0 z-0 h-screen w-screen select-none cursor-default opacity-90"
      />
      <div className="bg-bkg rounded-lg shadow-lg py-6 px-4 z-10 space-y-4 relative">
        <img src={logo} className="h-20 mx-auto pr-12" />
        <div className="absolute top-[78px] w-3/4 text-right ml-1 font-medium text-blue-900">
          Employee Portal
        </div>
        <BasicInput
          id={1}
          text={emailInput}
          setText={(text) => handleTextChange(text, "email")}
          label="Username"
        />
        <PWInput
          label="Password"
          name="password"
          text={pwInput}
          setText={(text) => handleTextChange(text, "password")}
          handleKeyDown={handleKeyDown}
        />
        <button className="btn-themeIndigo w-full" onClick={handleLogin}>
          Sign In
        </button>
        <div
          className="text-[13px] font-medium absolute bottom-1 right-5 hover:text-indigo-500 cursor-pointer transition-all duration-200"
          onClick={handleForgotPWClick}
        >
          Forgot Password?
        </div>
      </div>
    </div>
  );
};

export default Login;

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
          dispatch(setToken(j.access_token));
          dispatch(setUserData(j.user));
          dispatch(setIsLoggedIn(true));
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="bg-bkg h-screen w-screen flex justify-center items-center">
      <img
        src={bg}
        draggable={false}
        className="bg-cover bg-center absolute inset-0 z-0 h-screen w-screen select-none cursor-default opacity-90"
      />
      <div className="bg-bkg rounded-lg shadow-lg p-4 z-10 space-y-4 relative">
        <img src={logo} className="h-20 mx-auto pr-12" />
        <div className="absolute top-[70px] w-3/4 text-right ml-1 font-medium text-blue-900">
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
      </div>
    </div>
  );
};

export default Login;

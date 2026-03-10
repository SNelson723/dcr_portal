import { useState } from "react";
import zxcvbn from "zxcvbn";
import Eye from "../../icons/Eye";

interface PWInputProps {
  name: string;
  text: string;
  setText: (x: string, action: string) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  action?: string;
  isConfirming?: boolean;
  label?: string;
  className?: string;
  leftCompare?: string;
  rightCompare?: string;
}

const PWInput = ({
  label = "",
  name,
  text,
  setText,
  handleKeyDown,
  isConfirming = false,
  action = "",
  className = "py-1.5",
  leftCompare = "",
  rightCompare = "",
}: PWInputProps) => {
  const [inputType, setInputType] = useState("password");
  const [encrypted, setEncrypted] = useState(inputType === "password");

  const handleEncryptionToggle = () => {
    setEncrypted(!encrypted);
    setInputType(encrypted ? "text" : "password");
  };

  const showMsg = () => {
    if (!isConfirming) return "";

    if (name === "confirm_password" && text.length > 0) {
      if (leftCompare !== rightCompare) {
        return "- Passwords do not match";
      } else if (leftCompare === rightCompare) {
        return "- Passwords Match";
      }
    }

    if (name === "password" && text.length > 0) {
      const score = zxcvbn(text).score;
      // check password strength
      switch (score) {
        case 0:
          return "Very Weak";
        case 1:
          return "Weak";
        case 2:
          return "Moderate";
        case 3:
          return "Strong";
        case 4:
          return "Very Strong";
      }
    }
  };

  const showPasswordStrength = (score: number) => {
    if (!isConfirming) return "w-0";

    switch (score) {
      case 0:
        return "w-0 ";
      case 1:
        return "w-1/4 bg-red-500";
      case 2:
        return "w-1/2 bg-yellow-500";
      case 3:
        return "w-3/4 bg-orange-500";
      case 4:
        return "w-full bg-emerald-500";
    }
  };
  const showTextColor = () => {
    if (!isConfirming) return "text-content";

    if (name === "confirm_password") {
      if (leftCompare !== rightCompare) {
        return "text-orange-500";
      } else if (leftCompare === rightCompare) {
        return "text-emerald-500";
      }
    }

    const score = zxcvbn(text).score;
    switch (score) {
      case 0:
        return "text-content";
      case 1:
        return "text-red-500";
      case 2:
        return "text-yellow-500";
      case 3:
        return "text-orange-500";
      case 4:
        return "text-emerald-500";
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value, action);
  };

  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && handleKeyDown) {
      handleKeyDown(e);
    }
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="text-sm font-medium ml-1 flex gap-1">
        {label}
        <div
          data-testid={`pw-input-${name}-message`}
          className={showTextColor()}
        >
          {showMsg()}
        </div>
      </label>
      <input
        data-testid={`pw-input-${name}`}
        id={name}
        type={inputType}
        value={text}
        onChange={handleTextChange}
        className={`basic-input focus:border bg-custom-white ${className}`}
        onKeyDown={handleEnterDown}
      />
      <Eye onClick={handleEncryptionToggle} />
      <div
        className={`${isConfirming ? "block" : "hidden"} h-1 w-[97%] mx-auto rounded-full bg-content/10 mt-1`}
      >
        <div
          data-testid="pw-str-bar"
          className={`${showPasswordStrength(zxcvbn(text).score)} h-full`}
        ></div>
      </div>
    </div>
  );
};

export default PWInput;

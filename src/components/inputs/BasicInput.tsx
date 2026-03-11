interface BasicInputProps {
  id: number;
  text: string;
  setText: (x: string, action: string) => void;
  action?: string;
  label?: string;
  type?: string;
  className?: string;
  width?: string;
}

const BasicInput = ({
  id,
  text,
  setText,
  label = "",
  action = "",
  type = "text",
  className = "py-1.5",
  width = "w-full",
}: BasicInputProps) => {
  const testid = `basic-input-${id}`;

  return (
    <div className={`${width}`}>
      {label ? (
        <label htmlFor={label} className="font-medium text-sm pl-1">
          {label}
        </label>
      ) : null}
      <input
        data-testid={testid}
        id={label}
        type={type}
        value={text}
        onChange={(e) => setText(e.target.value, action)}
        className={`basic-input focus:border w-full bg-custom-white ${className}`}
      />
    </div>
  );
};

export default BasicInput;

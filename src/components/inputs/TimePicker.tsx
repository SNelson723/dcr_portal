import { useState, useEffect, useRef, useCallback } from "react";

interface TimePickerProps {
  label: string;
  text: string;
  setText: (value: string) => void;
  id: string;
}

const TimePicker = ({ label, text, setText, id }: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hours, setHours] = useState<string>("08");
  const [minutes, setMinutes] = useState<string>("30");
  const ref = useRef<HTMLDivElement>(null);

  // Format display time (e.g., "09:30")
  const displayTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

  // Parse text value on mount/change
  useEffect(() => {
    if (text && text.includes(":")) {
      const [h, m] = text.split(":");
      setHours(h || "09");
      setMinutes(m || "30");
    }
  }, [text]);

  // Update parent when time changes
  useEffect(() => {
    setText(`${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`);
  }, [hours, minutes, setText]);

  // Close dropdown on outside click
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const increment =
    (setter: React.Dispatch<React.SetStateAction<string>>, max: number) =>
    (value: string) => {
      const next = (parseInt(value) + 1) % (max + 1);
      setter(next.toString().padStart(2, "0"));
    };

  const decrement =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (value: string) => {
      const next = parseInt(value) === 0 ? 23 : parseInt(value) - 1;
      setter(next.toString().padStart(2, "0"));
    };

  return (
    <div className="space-y-1" ref={ref}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-content block ml-1"
      >
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-content rounded-lg shadow-sm bg-white focus:outline-none focus:ring-none focus:border-indigo-500 text-left text-sm text-content"
        >
          {displayTime}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-custom-white border border-indigo-500 rounded-md shadow-lg p-2">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="">
                <div className="text-xs uppercase tracking-wide font-medium mb-1">
                  Hour
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.currentTarget.value)}
                    className="border-none ring-none rounded-full w-16 h-10 bg-indigo-200 focus:border-indigo-500 focus:ring-none text-center focus:ring-0 font-bold text-indigo-800"
                  />
                  <div className="flex justify-around items-center rounded-full bg-slate-200 w-full select-none">
                    <button
                      type="button"
                      onClick={() => decrement(setHours)(hours)}
                      className="rounded-l-full hover:bg-indigo-200 flex items-center justify-center text-sm font-medium p-1 w-1/2 transition-all duration-200"
                    >
                      {`-`}
                    </button>
                    <button
                      type="button"
                      onClick={() => increment(setHours, 23)(hours)}
                      className="rounded-r-full hover:bg-indigo-200 flex items-center justify-center text-sm font-medium p-1 w-1/2 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="text-xs uppercase tracking-wide font-medium mb-1">
                  Min
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                  <input
                    type="text"
                    value={minutes}
                    onChange={(e) => setMinutes(e.currentTarget.value)}
                    className="border-none ring-none rounded-full w-16 h-10 bg-indigo-200 focus:border-indigo-500 focus:ring-none text-center focus:ring-0 font-bold text-indigo-800"
                  />
                  <div className="flex justify-around items-center rounded-full bg-slate-200 w-full select-none">
                    <button
                      type="button"
                      onClick={() => decrement(setMinutes)(minutes)}
                      className="rounded-l-full hover:bg-indigo-200 flex items-center justify-center text-sm font-medium p-1 w-1/2 transition-all duration-200"
                    >
                      {`-`}
                    </button>
                    <button
                      type="button"
                      onClick={() => increment(setMinutes, 59)(minutes)}
                      className="rounded-r-full hover:bg-indigo-200 flex items-center justify-center text-sm font-medium p-1 w-1/2 transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimePicker;

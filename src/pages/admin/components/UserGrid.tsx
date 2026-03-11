import { useState } from "react";
import { useAdminCtx } from "../hooks";
import BasicInput from "../../../components/inputs/BasicInput";

type SearchType = "name" | "email";

const UserGrid = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [type, setType] = useState<SearchType>("name");
  const { employees, employeeLevels } = useAdminCtx();

  const findEL = (lvl: number) => {
    const level = employeeLevels.filter((el) => el.id === lvl)[0];
    return level ? level.level : "";
  };

  const handleSearchText = (x: string, a: string) => {
    if (a === "search") {
      setSearchText(x);
    }
  };

  const handleTypeSelect = (t: SearchType) => {
    setType(t);
  };

  return (
    <div className="bg-bkg p-2 rounded-lg shadow-md shadow-indigo-200/50 space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-2 rounded-lg text-center text-sm">
          <div
            className={`${type === "name" ? "bg-indigo-500" : "bg-indigo-200"} py-1`}
            onClick={() => handleTypeSelect("name")}
          >
            Name
          </div>
          <div
            className={`${type === "email" ? "bg-indigo-500" : "bg-indigo-200"} py-1`}
            onClick={() => handleTypeSelect("email")}
          >
            Email
          </div>
        </div>
        <BasicInput
          id={99}
          text={searchText}
          setText={handleSearchText}
          action="search"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 max-h-[70vh] overflow-hidden overflow-y-scroll no-scrollbar">
        {employees.map((emp, i) => (
          <div
            key={i}
            className="bg-custom-white rounded-lg shadow-md p-4 flex flex-col items-center gap-1"
          >
            <div className="w-24 h-12 bg-indigo-200 rounded-full flex items-center justify-center">
              {findEL(emp.employee_level)}
            </div>
            <div className="text-sm font-medium">{`${emp.firstname} ${emp.lastname}`}</div>
            <div className="text-xs text-gray-500">{emp.dcr_email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGrid;

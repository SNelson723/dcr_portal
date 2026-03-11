import { useState, useEffect } from "react";
import { useAdminCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import BasicInput from "../../../components/inputs/BasicInput";
import type { Employee } from "../../../interfaces/jsonResp";
import { setEmployeeInfo } from "../../../features/adminSlice";

type SearchType = "name" | "email";

const UserGrid = () => {
  const dispatch = useAppDispatch();

  const [type, setType] = useState<SearchType>("name");
  const [searchText, setSearchText] = useState<string>("");
  const { employees, employeeLevels, employeeInfo } = useAdminCtx();
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((emp) => {
        if (type === "name") {
          const fullName = `${emp.firstname} ${emp.lastname}`.toLowerCase();
          return fullName.includes(searchText.toLowerCase());
        } else if (type === "email") {
          return emp.dcr_email.toLowerCase().includes(searchText.toLowerCase());
        }
      });
      setFilteredEmployees(filtered);
    }
  }, [searchText, employees]);

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

  const selectedBG = (userid: number) => {
    if (userid === employeeInfo?.userid) {
      return "bg-amber-200";
    }
    return "bg-custom-white";
  };

  const handleEmployeeSelect = (emp: Employee) => {
    dispatch(setEmployeeInfo(emp));
  };

  return (
    <div className="bg-bkg p-2 rounded-lg shadow-md shadow-indigo-200/50 space-y-4 select-none">
      <div className="space-y-2">
        <div className="grid grid-cols-2 rounded-lg text-center text-sm">
          <div
            className={`${type === "name" ? "bg-indigo-500 text-custom-white" : "bg-indigo-200"} py-1.5 font-medium rounded-l-full transition-all duration-200 cursor-pointer`}
            onClick={() => handleTypeSelect("name")}
          >
            Name
          </div>
          <div
            className={`${type === "email" ? "bg-indigo-500 text-custom-white" : "bg-indigo-200"} py-1.5 font-medium rounded-r-full transition-all duration-200 cursor-pointer`}
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
        {filteredEmployees.map((emp, i) => (
          <div
            key={i}
            className={`${selectedBG(emp.userid)} rounded-lg shadow-md p-4 flex flex-col items-center gap-1 hover:bg-amber-100 cursor-pointer transition-colors duration-200`}
            onClick={() => handleEmployeeSelect(emp)}
          >
            <div className="w-24 h-12 bg-indigo-200/80 rounded-full flex items-center justify-center">
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

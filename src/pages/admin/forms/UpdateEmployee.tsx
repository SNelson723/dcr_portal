import { useAdminCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import { useToast } from "../../../components/toasts/hooks/useToast";

import BasicInput from "../../../components/inputs/BasicInput";
import SingleSelect from "../../../components/inputs/SingleSelect";
import EmployeeInfoCard from "../EmployeeInfoCard";

import {
  resetEmployeeInfo,
  setAdminRefresh,
  setEmployeeInfo,
} from "../../../features/adminSlice";
import { updateEmployee } from "../../../api/admin";
import type { JsonError } from "../../../interfaces/jsonResp";
import UserGrid from "../components/UserGrid";

const UpdateEmployee = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { employeeInfo, pw, pwConfirm, url, token, employeeLevels } =
    useAdminCtx();

  const handleFormText = (text: string, action: string) => {
    if (action === "first_name") {
      dispatch(setEmployeeInfo({ ...employeeInfo, firstname: text }));
    } else if (action === "last_name") {
      dispatch(setEmployeeInfo({ ...employeeInfo, lastname: text }));
    } else if (action === "username") {
      dispatch(setEmployeeInfo({ ...employeeInfo, username: text }));
    } else if (action === "email") {
      dispatch(setEmployeeInfo({ ...employeeInfo, dcr_email: text }));
    } else if (action === "role") {
      dispatch(setEmployeeInfo({ ...employeeInfo, role: text }));
    } else if (action === "dob") {
      dispatch(setEmployeeInfo({ ...employeeInfo, dob: text }));
    }
  };

  const canSubmit = () => {
    if (
      !employeeInfo.firstname ||
      !employeeInfo.lastname ||
      !employeeInfo.dcr_email ||
      !employeeInfo.role ||
      !employeeInfo.dob ||
      !pw ||
      !pwConfirm
    ) {
      return "opacity-50 pointer-events-none";
    }
    return "";
  };

  const handleClear = () => {
    dispatch(resetEmployeeInfo());
  };

  const handleELSelect = (value: string | number) => {
    dispatch(
      setEmployeeInfo({ ...employeeInfo, employee_level: Number(value) }),
    );
  };

  const handleSubmit = () => {
    updateEmployee(url, token, employeeInfo)
      .then((resp) => {
        const j = resp.data;
        if (j.error === 0) {
          handleClear();
          dispatch(setAdminRefresh(true));
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <div className="space-y-4">
        <EmployeeInfoCard />
        <UserGrid />
      </div>
      <div className="bg-custom-white rounded-lg p-2 grid grid-cols-2 gap-2 shadow-md shadow-indigo-200/50 w-[55%] min-h-[273px] max-h-[273px]">
        <BasicInput
          id={1}
          label="First Name"
          text={employeeInfo.firstname}
          action="first_name"
          setText={handleFormText}
        />
        <BasicInput
          id={2}
          label="Last Name"
          action="last_name"
          text={employeeInfo.lastname}
          setText={handleFormText}
        />
        <BasicInput
          id={4}
          label="Email"
          text={employeeInfo.dcr_email}
          action="email"
          setText={handleFormText}
        />
        <BasicInput
          id={5}
          label="Role"
          text={employeeInfo.role}
          action="role"
          setText={handleFormText}
        />
        <div className="grid grid-cols-2 col-span-2 gap-2 place-items-end">
          <BasicInput
            id={6}
            label="DOB - mm/dd/yyyy"
            text={employeeInfo.dob}
            action="dob"
            setText={handleFormText}
          />
          <SingleSelect
            label="Employee Level"
            data={employeeLevels}
            displayKey="level"
            valueKey="id"
            onSelect={handleELSelect}
            innerClass="py-1.5"
            className="w-full"
          />
        </div>
        <div className="btn-themeAmber" onClick={handleClear}>
          Clear
        </div>
        <div
          className={`btn-themeIndigo ${canSubmit()}`}
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;

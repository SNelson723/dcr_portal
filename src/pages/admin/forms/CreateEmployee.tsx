import { useAdminCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import { useToast } from "../../../components/toasts/hooks/useToast";

import {
  resetEmployeeInfo,
  setAdminRefresh,
  setEmployeeInfo,
  setPw,
  setPwConfirm,
} from "../../../features/adminSlice";

// Components
import BasicInput from "../../../components/inputs/BasicInput";
import PWInput from "../../../components/inputs/PWInput";
import EmployeeInfoCard from "../EmployeeInfoCard";
import { createEmployee } from "../../../api/admin";
import type { JsonError } from "../../../interfaces/jsonResp";
import SingleSelect from "../../../components/inputs/SingleSelect";

const CreateEmployee = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { employeeInfo, pw, pwConfirm, url, token, employeeLevels } = useAdminCtx();

  const handlePWText = (text: string, action: string) => {
    if (action === "password") {
      dispatch(setPw(text));
    } else {
      dispatch(setPwConfirm(text));
    }
  };

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
    dispatch(setPw(""));
    dispatch(setPwConfirm(""));
  };

  const handleSubmit = () => {
    createEmployee(url, token, employeeInfo, pw)
      .then((resp) => {
        const j = resp.data;
        if (j.error === 0) {
          handleClear();
          dispatch(setAdminRefresh(true));
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  const handleELSelect = (value: string | number) => {
    dispatch(
      setEmployeeInfo({ ...employeeInfo, employee_level: Number(value) }),
    );
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <EmployeeInfoCard />
      <div className="bg-custom-white rounded-lg p-2 grid grid-cols-2 gap-2 shadow-md shadow-indigo-200/50 w-[55%]">
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
        <PWInput
          name="password"
          label="Password"
          text={pw}
          action="password"
          setText={handlePWText}
          isConfirming={true}
          leftCompare={pw}
          rightCompare={pwConfirm}
        />
        <PWInput
          name="confirm_password"
          label="Confirm Password"
          action="confirm_password"
          text={pwConfirm}
          setText={handlePWText}
          isConfirming={true}
          leftCompare={pw}
          rightCompare={pwConfirm}
        />
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

export default CreateEmployee;

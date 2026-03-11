import { useAdminCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import { useToast } from "../../../components/toasts/hooks/useToast";
import { removeEmployee } from "../../../api/admin";
import type { JsonError } from "../../../interfaces/jsonResp";

import {
  resetEmployeeInfo,
  setAdminRefresh,
  setIsRemovingEmployee,
} from "../../../features/adminSlice";

import BasicInput from "../../../components/inputs/BasicInput";
import SingleSelect from "../../../components/inputs/SingleSelect";
import EmployeeInfoCard from "../EmployeeInfoCard";
import UserGrid from "../components/UserGrid";
import { WarningIcon } from "../../../components/toasts/icons";

const RemoveEmployee = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { employeeInfo, url, token, employeeLevels, isRemovingEmployee } =
    useAdminCtx();

  const canSubmit = () => {
    if (
      !employeeInfo.firstname ||
      !employeeInfo.lastname ||
      !employeeInfo.dcr_email ||
      !employeeInfo.role ||
      !employeeInfo.dob
    ) {
      return "opacity-50 pointer-events-none";
    }
    return "";
  };

  const handleClear = () => {
    dispatch(setIsRemovingEmployee(false));
    dispatch(resetEmployeeInfo());
  };

  const handleCancel = () => {
    dispatch(setIsRemovingEmployee(false));
  };

  const handleSubmit = () => {
    removeEmployee(url, token, employeeInfo.userid)
      .then((resp) => {
        const j = resp.data;
        if (j.error === 0) {
          handleClear();
          dispatch(setAdminRefresh(true));
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  };

  const handleRemoveStepOne = () => {
    dispatch(setIsRemovingEmployee(true));
  };

  const defaultELQuery = () => {
    if (employeeInfo.employee_level) {
      return employeeLevels.filter(
        (el) => el.id === employeeInfo.employee_level,
      )[0].level;
    }
    return "";
  };

  const defaultELValue = () => {
    if (employeeInfo.employee_level) {
      return employeeLevels.filter(
        (el) => el.id === employeeInfo.employee_level,
      )[0].id;
    }
    return 0;
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <div className="space-y-4">
        <EmployeeInfoCard />
        <UserGrid />
      </div>
      {!isRemovingEmployee ? (
        <div className="bg-custom-white rounded-lg p-2 grid grid-cols-2 gap-2 shadow-md shadow-indigo-200/50 w-[55%] min-h-[273px] max-h-[273px]">
          <BasicInput
            className="opacity-50 pointer-events-none py-1.5"
            id={1}
            label="First Name"
            text={employeeInfo.firstname}
            action="first_name"
            setText={() => {}}
          />
          <BasicInput
            className="opacity-50 pointer-events-none py-1.5"
            id={2}
            label="Last Name"
            action="last_name"
            text={employeeInfo.lastname}
            setText={() => {}}
          />
          <BasicInput
            className="opacity-50 pointer-events-none py-1.5"
            id={4}
            label="Email"
            text={employeeInfo.dcr_email}
            action="email"
            setText={() => {}}
          />
          <BasicInput
            className="opacity-50 pointer-events-none py-1.5"
            id={5}
            label="Role"
            text={employeeInfo.role}
            action="role"
            setText={() => {}}
          />
          <div className="grid grid-cols-2 col-span-2 gap-2 place-items-end">
            <BasicInput
              className="opacity-50 pointer-events-none py-1.5"
              id={6}
              label="DOB - mm/dd/yyyy"
              text={employeeInfo.dob}
              action="dob"
              setText={() => {}}
            />
            <SingleSelect
              label="Employee Level"
              data={employeeLevels}
              displayKey="level"
              valueKey="id"
              onSelect={() => {}}
              innerClass="py-1.5 opacity-50"
              className="w-full pointer-events-none"
              resetQuery={true}
              defaultQuery={defaultELQuery()}
              defaultValue={defaultELValue()}
            />
          </div>
          <div className="btn-themeAmber" onClick={handleClear}>
            Clear
          </div>
          <div
            className={`btn-themeIndigo ${canSubmit()}`}
            onClick={handleRemoveStepOne}
          >
            Submit
          </div>
        </div>
      ) : (
        <div className="bg-custom-white rounded-lg p-2 flex flex-col justify-center items-center gap-2 shadow-md shadow-indigo-200/50 w-[40%] min-h-[200px] max-h-[200px]">
          <WarningIcon height={85} width={85} fill="#F59E0B" />
          <div className="font-medium">
            Are you sure you want to remove {employeeInfo.firstname}{" "}
            {employeeInfo.lastname}?
          </div>
          <div className="grid grid-cols-2 gap-2 w-[80%]">
            <div className="btn-themeAmber w-full" onClick={handleCancel}>
              Clear
            </div>
            <div
              className={`btn-themeRose w-full ${canSubmit()}`}
              onClick={handleSubmit}
            >
              Remove
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveEmployee;

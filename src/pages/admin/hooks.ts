import { useAppSelector } from "../../hooks";

export const useAdminCtx = () => {
  const {
    mainForm,
    pw,
    pwConfirm,
    employeeInfo,
    employees,
    adminRefresh,
    selectedEmployee,
    isRemovingEmployee,
    employeeLevels,
  } = useAppSelector((state) => state.admin);
  const { url, token } = useAppSelector((state) => state.app);
  const { userid, employeeLevel } = useAppSelector((state) => state.user);

  return {
    adminRefresh,
    employeeInfo,
    employeeLevel,
    employeeLevels,
    employees,
    isRemovingEmployee,
    mainForm,
    pw,
    pwConfirm,
    selectedEmployee,
    token,
    url,
    userid,
  };
};

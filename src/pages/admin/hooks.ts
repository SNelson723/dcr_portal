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
    employeeLevels,
  } = useAppSelector((state) => state.admin);
  const { url, token } = useAppSelector((state) => state.app);

  return {
    adminRefresh,
    employeeInfo,
    employeeLevels,
    employees,
    mainForm,
    pw,
    pwConfirm,
    selectedEmployee,
    token,
    url,
  };
};

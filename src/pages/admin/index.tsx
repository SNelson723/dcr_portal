import { useEffect } from "react";
import { useAdminCtx } from "./hooks";
import { useAppDispatch } from "../../hooks";
import { useToast } from "../../components/toasts/hooks/useToast";

import type { MainForm } from "../../features/adminSlice";
import type {
  EmployeeLevelsResp,
  EmployeeListResp,
  JsonError,
} from "../../interfaces/jsonResp";
import {
  setMainForm,
  setEmployees,
  setAdminRefresh,
  setEmployeeLevels,
  resetEmployeeInfo,
} from "../../features/adminSlice";
import { getAllEmployees, getEmployeeLevels } from "../../api/admin";

// Form Components
import CreateEmployee from "./forms/CreateEmployee";
import UpdateEmployee from "./forms/UpdateEmployee";
import RemoveEmployee from "./forms/RemoveEmployee";
import PasswordReset from "./forms/PasswordReset";
import SecurityQuestionReset from "./forms/UpdateSecurityQuestion";

const AdminPage = () => {
  const ctx = useAdminCtx();
  const toast = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getEmployeeLevels(ctx.url, ctx.token)
      .then((resp) => {
        const j: EmployeeLevelsResp = resp.data;
        if (j.error === 0) {
          dispatch(setEmployeeLevels(j.employee_levels));
        }
      })
      .catch((err: JsonError) => toast.error(err.message));
  }, []);

  // When we refresh from any of the forms, get the updated employee list
  useEffect(() => {
    if (ctx.adminRefresh) {
      getAllEmployees(ctx.url, ctx.token, ctx.userid)
        .then((resp) => {
          const j: EmployeeListResp = resp.data;
          if (j.error === 0) {
            dispatch(setEmployees(j.employees));
          }
        })
        .catch((err: JsonError) => toast.error(err.message))
        .finally(() => dispatch(setAdminRefresh(false)));
    }
  }, [ctx.adminRefresh]);

  useEffect(() => {
    dispatch(resetEmployeeInfo());
  }, [ctx.mainForm]);

  const renderForm = () => {
    switch (ctx.mainForm) {
      case 1:
        return <CreateEmployee />;
      case 2:
        return <UpdateEmployee />;
      case 3:
        return <RemoveEmployee />;
      case 4:
        return <PasswordReset />;
      case 5:
        return <SecurityQuestionReset />;
      default:
        return null;
    }
  };

  const handleFormSelect = (formNumber: MainForm) => {
    dispatch(setMainForm(formNumber));
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] overflow-hidden space-y-4">
      <div className="bg-custom-white p-2 grid rounded-lg grid-cols-5 gap-2">
        <button
          className={`${ctx.mainForm === 1 ? "btn-themeAmber" : "btn-themeIndigo"}`}
          onClick={() => handleFormSelect(1)}
        >
          New Employee
        </button>
        <button
          className={`${ctx.mainForm === 2 ? "btn-themeAmber" : "btn-themeIndigo"}`}
          onClick={() => handleFormSelect(2)}
        >
          Update Employee
        </button>
        <button
          className={`${ctx.mainForm === 3 ? "btn-themeAmber" : "btn-themeIndigo"}`}
          onClick={() => handleFormSelect(3)}
        >
          Remove Employee
        </button>
        <button
          className={`${ctx.mainForm === 4 ? "btn-themeAmber" : "btn-themeIndigo"}`}
          onClick={() => handleFormSelect(4)}
        >
          Reset Password
        </button>
        <button
          className={`${ctx.mainForm === 5 ? "btn-themeAmber" : "btn-themeIndigo"}`}
          onClick={() => handleFormSelect(5)}
        >
          Reset Security Question
        </button>
      </div>
      {renderForm()}
    </div>
  );
};

export default AdminPage;

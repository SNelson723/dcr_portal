import { useAdminCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import { useToast } from "../../../components/toasts/hooks/useToast";
import { resetEmployeeInfo } from "../../../features/adminSlice";

import EmployeeInfoCard from "../EmployeeInfoCard";
import UserGrid from "../components/UserGrid";
import { resetSQFlag } from "../../../api/admin";

const SecurityQuestionReset = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { employeeInfo, url, token } = useAdminCtx();

  const handleClear = () => {
    dispatch(resetEmployeeInfo());
  };

  const handleSubmit = () => {
    resetSQFlag(url, token, employeeInfo.userid)
      .then((resp) => {
        const j = resp.data;
        if (j.error === 0) {
          handleClear();
          toast.success("Security question reset flag updated");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <div className="space-y-4">
        <EmployeeInfoCard />
        <UserGrid />
      </div>
      <div className="bg-custom-white h-[7.25rem] max-h-[7.25rem] w-[35%] rounded-lg shadow-md shadow-indigo-200/50">
        {employeeInfo.userid ? (
          <div className="flex flex-col justify-center items-center h-full text-center p-4">
            <div className="space-x-1">
              <span>Reset security question flag for</span>
              <span className="font-medium">
                {employeeInfo.firstname} {employeeInfo.lastname}
              </span>
              ?
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 w-[77%]">
              <button className="btn-themeAmber w-full" onClick={handleClear}>
                Clear
              </button>
              <button className="btn-themeIndigo w-full" onClick={handleSubmit}>
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full text-center p-4 text-sm font-medium">
            <div>
              Select an employee from the left to reset their security question
            </div>
            <div>
              They will be prompted to reset it on their next login attempt
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityQuestionReset;

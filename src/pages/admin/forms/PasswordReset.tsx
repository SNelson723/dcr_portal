import { useAdminCtx } from "../hooks";
import { useAppDispatch } from "../../../hooks";
import { useToast } from "../../../components/toasts/hooks/useToast";

import EmployeeInfoCard from "../EmployeeInfoCard";
import UserGrid from "../components/UserGrid";

const PasswordReset = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { employeeInfo, url, token } = useAdminCtx();
  
  return (
    <div className="grid grid-cols-[1fr_3fr] gap-4">
      <div className="space-y-4">
        <EmployeeInfoCard />
        <UserGrid />
      </div>
    </div>
  );
};

export default PasswordReset;

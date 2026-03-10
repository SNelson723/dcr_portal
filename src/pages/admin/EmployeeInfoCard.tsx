import { useAdminCtx } from "./hooks";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const EmployeeInfoCard = () => {
  const info = useAdminCtx().employeeInfo;

  return (
    <div className="bg-indigo-800 text-custom-white rounded-lg shadow-indigo-200/50 shadow-md p-2 w-1/4 flex max-h-[8.6rem]">
      <UserCircleIcon className="w-24 h-24 stroke-bkg" />
      <div className="text-sm">
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Name:</div>
          <div>{`${info.firstname} ${info.lastname}`}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Username:</div>
          <div>{info.username}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Email:</div>
          <div>{info.dcr_email}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Role:</div>
          <div>{info.role}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">DOB:</div>
          <div>{info.dob}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">User Level:</div>
          {/* <div>{info.is_admin ? "Admin" : "Employee"}</div> */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoCard;

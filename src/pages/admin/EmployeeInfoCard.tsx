import { useAdminCtx } from "./hooks";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const EmployeeInfoCard = () => {
  const info = useAdminCtx().employeeInfo;

  const {employeeLevels} = useAdminCtx();
  const level = employeeLevels.find((lvl) => lvl.id === info.employee_level)?.level || "";


  return (
    <div className="bg-indigo-800 text-custom-white rounded-lg shadow-indigo-200/50 shadow-md p-2 w-1/4 flex max-h-[7.5rem]">
      <UserCircleIcon className="w-24 h-24 stroke-bkg" />
      <div className="text-sm">
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Name:</div>
          <div>{`${info.firstname} ${info.lastname}`}</div>
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
          <div className="font-medium text-bkg">Level:</div>
          <div>{level}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfoCard;

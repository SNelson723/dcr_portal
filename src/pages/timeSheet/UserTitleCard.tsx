import { useAppSelector } from "../../hooks";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const UserTitleCard = () => {
  const { email, role, userid, lastName, firstName } = useAppSelector(
    (state) => state.user,
  );
  
  return (
    <div className="flex items-center bg-indigo-800 text-custom-white p-4 rounded-lg shadow-indigo-200/50 shadow-md">
      <UserCircleIcon className="w-24 h-24 stroke-bkg" />
      <div className="text-sm ml-3 space-y-1">
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Name:</div>
          <div>{`${firstName} ${lastName}`}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Email:</div>
          <div>{email}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Role:</div>
          <div>{role}</div>
        </div>
        <div className="flex gap-2">
          <div className="font-medium text-bkg">Employee #:</div>
          <div>{userid}</div>
        </div>
      </div>
    </div>
  );
};

export default UserTitleCard;

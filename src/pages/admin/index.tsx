
const AdminPage = () => {

  return (
    <div className="min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2rem)] overflow-hidden">
      <div className="bg-custom-white p-2 grid grid-cols-5 gap-2">
        <button className="btn-themeIndigo">New Employee</button>
        <button className="btn-themeIndigo">Update Employee</button>
        <button className="btn-themeIndigo">Remove Employee</button>
        <button className="btn-themeIndigo">Reset Password</button>
        <button className="btn-themeIndigo">Reset Security Question</button>
      </div>
    </div>
  );
};

export default AdminPage;
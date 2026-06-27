import { Link } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Management System</h1>

        <div className="flex items-center gap-4">
          <span>{user?.name}</span>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <Link to="/attendance">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-blue-700">Attendance</h2>
            <p className="mt-3">Mark Attendance</p>
          </div>
        </Link>

        <Link to="/reports">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-green-700">Reports</h2>
            <p className="mt-3">View Reports</p>
          </div>
        </Link>

        <Link to="/students">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-purple-700">Students</h2>
            <p className="mt-3">Manage Student Records</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

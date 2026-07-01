import {
  FaHome,
  FaUserGraduate,
  FaSchool,
  FaClipboardCheck,
  FaChartBar,
  FaSignOutAlt,
  FaCalendarAlt,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function Sidebar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const active = (path) =>
    location.pathname === path
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
      : "text-slate-600 hover:bg-slate-100";

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <aside className="w-72 bg-white shadow-2xl flex flex-col border-r">
      {/* Logo */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-wider">
          AMS
        </h1>

        <p className="text-blue-100 text-sm mt-2">Attendance Management</p>
      </div>

      {/* User */}

      <div className="p-6 border-b">
        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto">
          {user?.name?.charAt(0)}
        </div>

        <h2 className="text-center font-bold mt-3">{user?.name}</h2>

        <p className="text-center text-sm text-gray-500 capitalize">
          {user?.role}
        </p>
      </div>

      {/* Menu */}

      <nav className="flex-1 p-5 space-y-3">
        <Link
          to="/dashboard"
          className={`flex items-center gap-4 p-4 rounded-xl transition ${active("/dashboard")}`}
        >
          <FaHome />
          Dashboard
        </Link>

        {user.role === "admin" && (
          <Link
            to="/students"
            className={`flex items-center gap-4 p-4 rounded-xl transition ${active("/students")}`}
          >
            <FaUserGraduate />
            Students
          </Link>
        )}

        {(user.role === "admin" || user.role === "instructor") && (
          <>
            <Link
              to="/classes"
              className={`flex items-center gap-4 p-4 rounded-xl transition ${active("/classes")}`}
            >
              <FaSchool />
              Classes
            </Link>

            <Link
              to="/sessions"
              className={`flex items-center gap-4 p-4 rounded-xl transition ${active("/sessions")}`}
            >
              <FaCalendarAlt />
              Sessions
            </Link>

            <Link
              to="/attendance"
              className={`flex items-center gap-4 p-4 rounded-xl transition ${active("/attendance")}`}
            >
              <FaClipboardCheck />
              Attendance
            </Link>

            <Link
              to="/reports"
              className={`flex items-center gap-4 p-4 rounded-xl transition ${active("/reports")}`}
            >
              <FaChartBar />
              Reports
            </Link>
          </>
        )}

        {user.role === "student" && (
          <Link
            to="/my-attendance"
            className={`flex items-center gap-4 p-4 rounded-xl transition ${active("/my-attendance")}`}
          >
            <FaClipboardCheck />
            My Attendance
          </Link>
        )}
      </nav>

      {/* Logout */}

      <div className="p-5 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

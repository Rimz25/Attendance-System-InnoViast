import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

import InfoCard from "../components/InfoCard";
import SectionTitle from "../components/SectionTitle";

function Dashboard() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    totalSessions: 0,
    present: 0,
    absent: 0,
    late: 0,
    recentAttendance: [],
  });

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const pieData = [
    {
      name: "Present",
      value: stats.present,
    },
    {
      name: "Absent",
      value: stats.absent,
    },
    {
      name: "Late",
      value: stats.late,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

  const barData = [
    {
      name: "Students",
      value: stats.totalStudents,
    },
    {
      name: "Classes",
      value: stats.totalClasses,
    },
    {
      name: "Sessions",
      value: stats.totalSessions,
    },
  ];

  return (
    <>
      <SectionTitle title={`Welcome, ${user?.name} 👋`} />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <InfoCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<FaUserGraduate />}
          color="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400"
        />

        <InfoCard
          title="Total Classes"
          value={stats.totalClasses}
          icon={<FaChalkboardTeacher />}
          color="bg-gradient-to-br from-violet-600 via-purple-500 to-pink-500"
        />

        <InfoCard
          title="Total Sessions"
          value={stats.totalSessions}
          icon={<FaCalendarAlt />}
          color="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400"
        />

        <InfoCard
          title="Present Today"
          value={stats.present}
          icon={<FaCheckCircle />}
          color="bg-gradient-to-br from-emerald-600 via-green-500 to-lime-400"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-slate-700">
            Attendance Status
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-slate-700">
            System Overview
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Attendance */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-700 mb-4">
          Recent Attendance
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {stats.recentAttendance.map((record) => (
                <tr key={record._id} className="border-b">
                  <td className="p-3">{record.student?.name}</td>

                  <td className="p-3">
                    {new Date(record.date).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        record.status === "Present"
                          ? "bg-green-500"
                          : record.status === "Absent"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <SectionTitle title="Quick Actions" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(user?.role === "admin" || user?.role === "instructor") && (
          <Link
            to="/attendance"
            className="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700 transition"
          >
            <h3 className="text-xl font-bold">Attendance</h3>
            <p className="mt-2">Mark student attendance</p>
          </Link>
        )}

        {(user?.role === "admin" || user?.role === "instructor") && (
          <Link
            to="/reports"
            className="bg-green-600 text-white rounded-xl p-6 hover:bg-green-700 transition"
          >
            <h3 className="text-xl font-bold">Reports</h3>
            <p className="mt-2">View attendance reports</p>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            to="/students"
            className="bg-purple-600 text-white rounded-xl p-6 hover:bg-purple-700 transition"
          >
            <h3 className="text-xl font-bold">Students</h3>
            <p className="mt-2">Manage students</p>
          </Link>
        )}

        {(user?.role === "admin" || user?.role === "instructor") && (
          <Link
            to="/classes"
            className="bg-indigo-600 text-white rounded-xl p-6 hover:bg-indigo-700 transition"
          >
            <h3 className="text-xl font-bold">Classes</h3>
            <p className="mt-2">Manage classes</p>
          </Link>
        )}

        {(user?.role === "admin" || user?.role === "instructor") && (
          <Link
            to="/sessions"
            className="bg-orange-600 text-white rounded-xl p-6 hover:bg-orange-700 transition"
          >
            <h3 className="text-xl font-bold">Sessions</h3>
            <p className="mt-2">Manage sessions</p>
          </Link>
        )}

        {user?.role === "student" && (
          <Link
            to="/my-attendance"
            className="bg-cyan-600 text-white rounded-xl p-6 hover:bg-cyan-700 transition"
          >
            <h3 className="text-xl font-bold">My Attendance</h3>
            <p className="mt-2">View your attendance</p>
          </Link>
        )}
      </div>
    </>
  );
}

export default Dashboard;

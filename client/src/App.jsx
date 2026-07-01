import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Sessions from "./pages/Sessions";
import MyAttendance from "./pages/MyAttendance";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Attendance */}
      <Route
        path="/attendance"
        element={
          <ProtectedRoute allowedRoles={["admin", "instructor"]}>
            <DashboardLayout>
              <Attendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["admin", "instructor"]}>
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Students */}
      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Classes */}
      <Route
        path="/classes"
        element={
          <ProtectedRoute allowedRoles={["admin", "instructor"]}>
            <DashboardLayout>
              <Classes />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Sessions */}
      <Route
        path="/sessions"
        element={
          <ProtectedRoute allowedRoles={["admin", "instructor"]}>
            <DashboardLayout>
              <Sessions />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Student Attendance */}
      <Route
        path="/my-attendance"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <DashboardLayout>
              <MyAttendance />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

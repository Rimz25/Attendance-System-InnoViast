import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
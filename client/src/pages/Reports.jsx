import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAttendance(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load attendance records");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Attendance Reports
      </h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Student</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((record) => (
            <tr key={record._id} className="border-b text-center">
              <td className="p-3">{record.student.name}</td>
              <td>{record.student.rollNo}</td>
              <td>{record.student.department}</td>

              <td>{new Date(record.date).toLocaleDateString()}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded text-white ${
                    record.status === "Present" ? "bg-green-600" : "bg-red-600"
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
  );
}

export default Reports;

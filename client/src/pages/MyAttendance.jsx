import { useEffect, useState } from "react";
import axios from "axios";

function MyAttendance() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const myAttendance = res.data.filter(
        (record) => record.student?._id === user._id,
      );

      setAttendance(myAttendance);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">My Attendance</h1>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Class</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((record) => (
              <tr key={record._id} className="border-b text-center">
                <td className="p-3">{record.classId?.className}</td>

                <td>{new Date(record.date).toLocaleDateString()}</td>

                <td>
                  <span
                    className={
                      record.status === "Present"
                        ? "text-green-600 font-bold"
                        : record.status === "Late"
                          ? "text-yellow-600 font-bold"
                          : "text-red-600 font-bold"
                    }
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
  );
}

export default MyAttendance;

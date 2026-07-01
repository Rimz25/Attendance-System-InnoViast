import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Attendance() {
  const token = localStorage.getItem("token");

  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetchClasses();
    fetchStudents();
    fetchSessions();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClasses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveAttendance = async () => {
    try {
      for (const studentId in attendance) {
        console.log({
          student: studentId,
          classId: selectedClass,
          sessionId: selectedSession,
          date: new Date(),
          status: attendance[studentId],
        });
        await axios.post(
          "http://localhost:5000/api/attendance",
          {
            student: studentId,
            classId: selectedClass,
            sessionId: selectedSession,
            date: new Date(),
            status: attendance[studentId],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      toast.success("Attendance Saved Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Save Attendance");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Attendance Management
      </h1>

      {/* Class & Session Selection */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Class</option>

            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className} ({cls.courseCode})
              </option>
            ))}
          </select>

          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Session</option>

            {sessions
              .filter((session) => {
                if (!session.classId) return false;

                if (typeof session.classId === "string") {
                  return session.classId === selectedClass;
                }

                return session.classId._id === selectedClass;
              })
              .map((session) => (
                <option key={session._id} value={session._id}>
                  {new Date(session.sessionDate).toLocaleDateString()} |{" "}
                  {session.startTime}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Mark Attendance
        </h2>

        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Student Name</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b text-center">
                <td className="p-3">{student.name}</td>

                <td>{student.rollNo}</td>

                <td>
                  <select
                    value={attendance[student._id] || ""}
                    onChange={(e) =>
                      setAttendance({
                        ...attendance,
                        [student._id]: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  >
                    <option value="">Select</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={saveAttendance}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}

export default Attendance;

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    classId: "",
    sessionDate: "",
    startTime: "",
    endTime: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem("token");

  // Load Classes
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

  // Load Sessions
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

  const addSession = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/sessions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Session Created Successfully");

      setFormData({
        classId: "",
        sessionDate: "",
        startTime: "",
        endTime: "",
      });

      fetchSessions();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteSession = async (id) => {
    if (!window.confirm("Delete this session?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/sessions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.error("Session Deleted");

      fetchSessions();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  const editSession = (session) => {
    setFormData({
      classId: session.classId._id,
      sessionDate: session.sessionDate.split("T")[0],
      startTime: session.startTime,
      endTime: session.endTime,
    });

    setEditingId(session._id);
    setIsEditing(true);
  };

  const updateSession = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/sessions/${editingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Session Updated");

      setFormData({
        classId: "",
        sessionDate: "",
        startTime: "",
        endTime: "",
      });

      setEditingId(null);
      setIsEditing(false);

      fetchSessions();
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Sessions Management
      </h1>

      <form
        onSubmit={isEditing ? updateSession : addSession}
        className="bg-white shadow rounded p-6 mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.classId}
            onChange={(e) =>
              setFormData({
                ...formData,
                classId: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          >
            <option value="">Select Class</option>

            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className} ({cls.courseCode})
              </option>
            ))}
          </select>

          <input
            type="date"
            value={formData.sessionDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                sessionDate: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                startTime: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="time"
            value={formData.endTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                endTime: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Session" : "Create Session"}
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Class</th>
            <th className="p-3">Date</th>
            <th className="p-3">Start Time</th>
            <th className="p-3">End Time</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {sessions.map((session) => (
            <tr key={session._id} className="border-b text-center">
              <td className="p-3">{session.classId?.className}</td>

              <td>{new Date(session.sessionDate).toLocaleDateString()}</td>

              <td>{session.startTime}</td>

              <td>{session.endTime}</td>

              <td className="p-3">
                <button
                  onClick={() => editSession(session)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSession(session._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sessions;

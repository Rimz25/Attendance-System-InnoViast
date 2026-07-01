import { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

function Reports() {
  const token = localStorage.getItem("token");

  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const summary = {
    total: filteredRecords.length,
    present: filteredRecords.filter((r) => r.status === "Present").length,
    absent: filteredRecords.filter((r) => r.status === "Absent").length,
    late: filteredRecords.filter((r) => r.status === "Late").length,
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const currentRecords = filteredRecords.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const [search, setSearch] = useState("");

  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [filters, setFilters] = useState({
    classId: "",
    sessionId: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    fetchReports();
    fetchClasses();
    fetchSessions();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/attendance/report",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      setRecords(res.data);
      setFilteredRecords(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const applyFilters = () => {
    let data = [...records];

    if (filters.classId) {
      data = data.filter((r) => r.classId?._id === filters.classId);
    }

    if (filters.sessionId) {
      data = data.filter((r) => r.sessionId?._id === filters.sessionId);
    }

    if (filters.status) {
      data = data.filter((r) => r.status === filters.status);
    }

    if (filters.date) {
      data = data.filter(
        (r) => new Date(r.date).toISOString().slice(0, 10) === filters.date,
      );
    }

    if (search) {
      data = data.filter(
        (r) =>
          r.student?.name.toLowerCase().includes(search.toLowerCase()) ||
          r.student?.rollNo.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredRecords(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Attendance Reports
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-5">
          <p className="text-gray-500">Total</p>
          <h2 className="text-4xl font-bold">{summary.total}</h2>
        </div>

        <div className="bg-green-500 text-white rounded-xl shadow-lg p-5">
          <p>Present</p>
          <h2 className="text-4xl font-bold">{summary.present}</h2>
        </div>

        <div className="bg-red-500 text-white rounded-xl shadow-lg p-5">
          <p>Absent</p>
          <h2 className="text-4xl font-bold">{summary.absent}</h2>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-5">
          <p>Late</p>
          <h2 className="text-4xl font-bold">{summary.late}</h2>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6 mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <select
            className="border p-2 rounded"
            value={filters.classId}
            onChange={(e) =>
              setFilters({
                ...filters,
                classId: e.target.value,
              })
            }
          >
            <option value="">All Classes</option>

            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={filters.sessionId}
            onChange={(e) =>
              setFilters({
                ...filters,
                sessionId: e.target.value,
              })
            }
          >
            <option value="">All Sessions</option>

            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {new Date(session.sessionDate).toLocaleDateString()}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded"
            value={filters.status}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
              })
            }
          >
            <option value="">All Status</option>
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
          </select>

          <input
            type="date"
            className="border p-2 rounded"
            value={filters.date}
            onChange={(e) =>
              setFilters({
                ...filters,
                date: e.target.value,
              })
            }
          />

          {/* Search */}
          <input
            type="text"
            placeholder="Search Student..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Apply Filters
          </button>

          <CSVLink
            data={filteredRecords}
            filename="Attendance_Report.csv"
            className="bg-green-600 text-white px-5 py-2 rounded"
          >
            Export CSV
          </CSVLink>

          <button
            onClick={() => window.print()}
            className="bg-purple-600 text-white px-5 py-2 rounded"
          >
            Print
          </button>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
        {" "}
        <table className="w-full">
          <thead className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
            {" "}
            <tr>
              <th className="p-3">Student</th>
              <th>Class</th>
              <th>Session</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((record) => (
              <tr
                key={record._id}
                className="border-b text-center hover:bg-slate-50 transition"
              >
                {" "}
                <td className="p-3">{record.student?.name}</td>
                <td>{record.classId?.className}</td>
                <td>
                  {record.sessionId?.sessionDate
                    ? new Date(
                        record.sessionId.sessionDate,
                      ).toLocaleDateString()
                    : "-"}
                </td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
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
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reports;

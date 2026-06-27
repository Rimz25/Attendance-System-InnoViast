import { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    semester: "",
    email: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Student Updated");
      console.log("Students API Response:", res.data);

      setStudents(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load students");
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/students", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Student Added Successfully");

      setFormData({
        name: "",
        rollNo: "",
        department: "",
        semester: "",
        email: "",
      });

      fetchStudents();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Student Deleted Successfully");

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Failed to delete student");
    }
  };

  const editStudent = (student) => {
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      department: student.department,
      semester: student.semester,
      email: student.email,
    });

    setEditingId(student._id);
    setIsEditing(true);
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/students/${editingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Editing ID:", editingId);
      console.log("Form Data:", formData);

      alert("Student Updated Successfully");

      setFormData({
        name: "",
        rollNo: "",
        department: "",
        semester: "",
        email: "",
      });

      setIsEditing(false);
      setEditingId(null);

      fetchStudents();
    } catch (error) {
      console.log(error);
      alert("Failed to update student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Students</h1>

      <form
        onSubmit={isEditing ? updateStudent : addStudent}
        className="bg-white shadow rounded p-6 mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Roll No"
            value={formData.rollNo}
            onChange={(e) =>
              setFormData({
                ...formData,
                rollNo: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Semester"
            value={formData.semester}
            onChange={(e) =>
              setFormData({
                ...formData,
                semester: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="border p-2 rounded col-span-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Student" : "Add Student"}
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Roll No</th>
            <th className="p-3">Department</th>
            <th className="p-3">Semester</th>
            <th className="p-3">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-b text-center">
              <td className="p-3">{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.department}</td>
              <td>{student.semester}</td>
              <td>{student.email}</td>

              <td className="p-3">
                <button
                  onClick={() => editStudent(student)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(student._id)}
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

export default Students;

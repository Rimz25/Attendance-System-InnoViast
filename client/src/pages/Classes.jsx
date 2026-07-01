import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Classes() {
  const [classes, setClasses] = useState([]);

  const [formData, setFormData] = useState({
    className: "",
    courseCode: "",
    instructor: "",
    department: "",
    semester: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);

      setClasses(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load classes");
    }
  };

  const addClass = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/classes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Class Added Successfully");

      setFormData({
        className: "",
        courseCode: "",
        instructor: "",
        department: "",
        semester: "",
      });

      fetchClasses();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deleteClass = async (id) => {
    if (!window.confirm("Delete this class?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/classes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Class Deleted Successfully");
      fetchClasses();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed");
    }
  };

  const editClass = (cls) => {
    setFormData({
      className: cls.className,
      courseCode: cls.courseCode,
      instructor: cls.instructor,
      department: cls.department,
      semester: cls.semester,
    });

    setEditingId(cls._id);
    setIsEditing(true);
  };

  const updateClass = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/classes/${editingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Class Updated Successfully");
      setFormData({
        className: "",
        courseCode: "",
        instructor: "",
        department: "",
        semester: "",
      });

      setEditingId(null);
      setIsEditing(false);

      fetchClasses();
    } catch (error) {
      console.log(error);

      toast.error("Update Failed");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Classes Management
      </h1>

      <form
        onSubmit={isEditing ? updateClass : addClass}
        className="bg-white shadow rounded p-6 mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Class Name"
            value={formData.className}
            onChange={(e) =>
              setFormData({
                ...formData,
                className: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Course Code"
            value={formData.courseCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                courseCode: e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Instructor"
            value={formData.instructor}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructor: e.target.value,
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
            className="border p-2 rounded col-span-2"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Class" : "Add Class"}
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Class</th>
            <th className="p-3">Course Code</th>
            <th className="p-3">Instructor</th>
            <th className="p-3">Department</th>
            <th className="p-3">Semester</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id} className="border-b text-center">
              <td className="p-3">{cls.className}</td>
              <td>{cls.courseCode}</td>
              <td>{cls.instructor}</td>
              <td>{cls.department}</td>
              <td>{cls.semester}</td>

              <td className="p-3">
                <button
                  onClick={() => editClass(cls)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteClass(cls._id)}
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

export default Classes;

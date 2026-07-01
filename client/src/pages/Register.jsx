import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      toast.success(res.data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <form
        onSubmit={register}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border p-3 rounded mb-6"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

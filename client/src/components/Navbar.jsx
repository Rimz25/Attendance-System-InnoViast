import { FaBell } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white h-20 px-8 shadow flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>

        <p className="text-gray-500">Welcome back, {user?.name} 👋</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative bg-slate-100 p-3 rounded-full hover:bg-slate-200 transition">
          <FaBell className="text-slate-700 text-xl" />

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
            {user?.name?.charAt(0)}
          </div>

          <div>
            <h2 className="font-bold">{user?.name}</h2>

            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

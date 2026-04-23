import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/employees?page=${page}&limit=5`);
        setEmployees(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [page]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      const res = await API.get(`/employees?page=${page}&limit=5`);
      setEmployees(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden p-6">
        <div className="mb-4 shrink-0">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your employees easily.
          </p>
        </div>

        <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-0">
          <div className="px-6 py-3 border-b border-slate-200 bg-slate-50 shrink-0">
            <h2 className="text-base font-bold text-slate-900">Employees</h2>
          </div>

          <div className="flex-1 overflow-auto min-h-0">
            {loading ? (
              <p className="text-center py-12 text-slate-500">Loading...</p>
            ) : employees.length === 0 ? (
              <p className="text-center py-12 text-slate-500">No employees found</p>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-100 text-left text-xs uppercase tracking-wider text-slate-600">
                    <th className="px-6 py-3 font-semibold">Name</th>
                    <th className="px-6 py-3 font-semibold">Email</th>
                    <th className="px-6 py-3 font-semibold">Department</th>
                    <th className="px-6 py-3 font-semibold">Role</th>
                    <th className="px-6 py-3 font-semibold">Salary</th>
                    <th className="px-6 py-3 font-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="px-6 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                            {emp.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-semibold text-slate-900">{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-2.5 text-slate-700">{emp.email}</td>
                      <td className="px-6 py-2.5">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-2.5 text-slate-700">{emp.role}</td>
                      <td className="px-6 py-2.5 font-bold text-emerald-600">${emp.salary}</td>
                      <td className="px-6 py-2.5">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(emp.id)}
                            className="px-3 py-1.5 text-xs font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="px-3 py-1.5 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex justify-center items-center gap-2 px-6 py-3 border-t border-slate-200 bg-slate-50 flex-wrap shrink-0">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm font-semibold bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`min-w-[34px] h-8 px-2 text-sm rounded-md font-semibold transition-colors ${
                  page === i + 1
                    ? "bg-blue-500 text-white shadow"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm font-semibold bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

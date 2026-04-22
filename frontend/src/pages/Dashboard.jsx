import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import API from "../services/api";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async (currentPage) => {
    try {
      const res = await API.get(
        `/employees?page=${currentPage}&limit=5`
      );

      setEmployees(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Users</h2>
            <p className="text-2xl font-bold">1,245</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold">$8,430</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Orders</h2>
            <p className="text-2xl font-bold">320</p>
          </div>

        </div>

        {/* EMPLOYEE TABLE */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4">
            Employees
          </h2>

          <table className="w-full border">

            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Department</th>
                <th className="p-2">Role</th>
                <th className="p-2">Salary</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="text-center border-t">
                  <td className="p-2">{emp.name}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2">{emp.department}</td>
                  <td className="p-2">{emp.role}</td>
                  <td className="p-2">{emp.salary}</td>
                </tr>
              ))}
            </tbody>

          </table>

          {/* PAGINATION */}
          <div className="flex justify-center gap-4 mt-4">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
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
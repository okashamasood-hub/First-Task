import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    salary: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/employees/${id}`);
        if (!res.data) {
          navigate("/dashboard");
          return;
        }
        setForm(res.data);
      } catch (error) {
        console.log("Fetch error:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await API.put(`/employees/${id}`, form);
      navigate("/dashboard");
    } catch (error) {
      console.log("Update error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  const initial = form.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
       
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-6 text-white">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
              {initial}
            </div>
            <div>
              <h2 className="text-xl font-bold">Edit Employee</h2>
              <p className="text-sm text-indigo-100">Update employee details</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Name
            </label>
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="email@company.com"
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <input
                name="department"
                value={form.department || ""}
                onChange={handleChange}
                placeholder="Engineering"
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Role
              </label>
              <input
                name="role"
                value={form.role || ""}
                onChange={handleChange}
                placeholder="Developer"
                className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
              <input
                name="salary"
                value={form.salary || ""}
                onChange={handleChange}
                placeholder="50000"
                className="w-full pl-7 pr-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
              />
            </div>
          </div>

       <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-4 py-2.5 text-sm font-semibold bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;

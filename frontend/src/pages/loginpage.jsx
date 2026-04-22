import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/formInput";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/login",form);

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">

      <div className="absolute top-5 left-5 text-xl font-bold text-blue-600">
        LiqTeq
      </div>

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
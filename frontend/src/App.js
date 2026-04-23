import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/loginpage";
import Dashboard from "./pages/Dashboard";
import EditEmployee from "./pages/editEmployee";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

       
        <Route
          path="/edit/:id"
          element={
            isAuthenticated ? (
              <EditEmployee />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
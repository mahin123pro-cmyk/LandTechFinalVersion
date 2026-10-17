
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import axios from "axios";


export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);



useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  axios
    .get("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => navigate("/admin/deedgenerate", { replace: true }))
    .catch(() => {
      localStorage.removeItem("token");
    });
}, [navigate]);
  async function handleSubmit(e) {
    e.preventDefault();

try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });
  if(res.status===200){
        localStorage.setItem("token", res.data.refreshToken);
    navigate("/admin", { replace: true });
      
    }
 

  }catch (err) {
    setError(err.response?.data?.message ||"Login failed. Try again."
    );
  } 
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl font-bold text-blue-950 text-center">
          VUMI Login
        </h1>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <input
          className="w-full border rounded-lg p-3"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border rounded-lg p-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={submitting}
          className="w-full bg-blue-950 text-white rounded-lg p-3 disabled:opacity-50"
        >
          {"Login"}
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link className="text-blue-700 font-semibold" to="/register">
            Register
          </Link>
        </p>

        <Link className="block text-center text-gray-600" to="/">
          Back to Home
        </Link>
      </form>
    </div>
  );
}

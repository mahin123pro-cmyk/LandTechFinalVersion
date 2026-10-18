
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

  if (token) {
    navigate("/admin", { replace: true });
  }
}, [navigate]);
  async function handleSubmit(e) {

    e.preventDefault();
    setSubmitting(true);
setError("");

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
  } finally {
  setSubmitting(false);
}
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md  mb-4">
        <h1 className="text-center">Dummy Data</h1>
        <div><p>email: admin@gmail.com</p>
        <p>password:12345678</p>
        </div>
        
      </div>
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
        {submitting ? "Logging in..." : "Login"}
        </button>

       

        <Link className="block text-center text-gray-600" to="/">
          Back to Home
        </Link>
      </form>
    </div>
  );
}


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../utils/api";

export default function Register() {

  const navigate = useNavigate();

  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
try{
  const res=await api.post("/api/auth/register",{username,email,password})
console.log(res)

  navigate("/otp")

    setError("");
    setSuccess("");
    setSubmitting(true);
}catch(error){
  setError(error?.response?.data?.message)
}

  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h1 className="text-3xl font-bold text-blue-950 text-center">
          Create Account
        </h1>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-700">{success}</p>}

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Full name"
          value={username}
          onChange={(e) => setuserName(e.target.value)}
          required
        />

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
          placeholder="Password (minimum 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        <button
          disabled={submitting}
          className="w-full bg-blue-950 text-white rounded-lg p-3 disabled:opacity-50"
        >
          {"Register"}
        </button>

        <p className="text-center">
          Already registered?{" "}
          <Link className="text-blue-700 font-semibold" to="/login">
            Login
          </Link>
        </p>

        <Link className="block text-center text-gray-600" to="/">
          Back to Home
        </Link>
      </form>
    </div>
  );
}

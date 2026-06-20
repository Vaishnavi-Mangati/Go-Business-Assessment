import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginUser } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  const token = Cookies.get("jwt_token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser(
        email,
        password
      );

      Cookies.set(
        "jwt_token",
        response.data.token
      );

      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border rounded-xl p-6"
      >
        <h1 className="text-3xl font-bold mb-2">
          Go Business
        </h1>

        <p className="text-gray-500 mb-6">
          Sign in to open your referral dashboard.
        </p>

        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {error && (
          <p role="alert" className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          className="w-full bg-black text-white py-3 rounded"
        >
          {loading
            ? "Signing in..."
            : "Sign in"}
        </button>
      </form>
    </div>
  );
}
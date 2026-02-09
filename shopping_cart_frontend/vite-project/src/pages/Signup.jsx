import { apiFetch } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Signup() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      alert("Signup successful. Please login.");
      setUser("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      alert("User already exists.");
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">Create account</p>
          <h1>Build your curated cart.</h1>
          <p>
            Sign up to save your favorites, unlock the dashboard, and check out
            faster.
          </p>
          <img
            src="https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1200&auto=format&fit=crop"
            alt="Ecommerce mood"
          />
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <label>
            Username
            <input
              className="input"
              value={username}
              type="text"
              placeholder="Enter username"
              onChange={(event) => setUser(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              className="input"
              value={password}
              type="password"
              placeholder="Create password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="button primary full" type="submit">
            Create account
          </button>
          <p className="muted">
            Already have an account?{" "}
            <button
              className="text-button"
              type="button"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

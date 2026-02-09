import { apiFetch } from "../api/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await apiFetch("/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      localStorage.setItem("token", data.token);
      alert("Login successful");

      setUser("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">Sign in</p>
          <h1>Welcome back to Arcade Cart.</h1>
          <p>
            Log in to keep your cart, track orders, and access exclusive
            drops.
          </p>
          <img
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop"
            alt="Shopping inspiration"
          />
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <label>
            Username
            <input
              className="input"
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(event) => setUser(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              className="input"
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button className="button primary full" type="submit">
            Login
          </button>
          <p className="muted">
            No account yet? <Link to="/signup"> Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

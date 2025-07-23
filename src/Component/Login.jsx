import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    localStorage.setItem("authToken", "fake-token");
    localStorage.setItem("userEmail", email);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
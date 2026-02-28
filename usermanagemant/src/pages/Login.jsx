import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'
import { showSuccess, showError } from "../utils/toast";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    dispatch(setCredentials(res.data));
    console.log(res.data);
    
    showSuccess("Login successful");

    if (res.data.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
      
    } catch (error) {
      const message=error.response?.data.message||'Login faild'
      showError(message)
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
  Don't have an account? <Link to="/register">Register</Link>
</p>
</div>
    </div>
  );
}

export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Register.css'
import { showError, showSuccess } from "../utils/toast";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
try {
  
    await axios.post("http://localhost:5000/api/auth/register", form);

    showSuccess('Registration successful. Please login.')
    navigate("/");
  
} catch (error) {
  let message=error.response?.data.message||'Registration is faild'
  showError(message)
}
  };

  return (
    <div className="register-container">
      <div className="register-card">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
       <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
      </div>
    </div>
  );
}

export default Register;
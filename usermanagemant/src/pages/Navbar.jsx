import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './Navbar.css'

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="navbar">

      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Navbar;
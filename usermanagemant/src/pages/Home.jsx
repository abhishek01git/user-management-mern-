import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import './Home.css'


function Home() {
return (
    <div className="home-container">
      <Navbar />

      <div className="home-card">
        <h2>Welcome to Home Page</h2>
        <p>This is your dashboard.</p>
      </div>
    </div>
  );
   
}

export default Home;
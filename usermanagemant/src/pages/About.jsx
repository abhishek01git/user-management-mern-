import React from "react";
import Navbar from "./Navbar";
import "./About.css";


function About() {
  return (
    <>
    <div className="home-container">
      <Navbar />
      
        <div className="about-card">
          <h2>About Page</h2>
          <p>
            This is a user management system built using the MERN stack.
            It allows users to register, login, and manage their profiles.
            Admin users can manage other users efficiently.
          </p>
        </div>
      
      </div>
    </>
  );
}

export default About;
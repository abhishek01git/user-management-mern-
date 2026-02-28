import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import defaultAvatar from "../assets/default-avatar.png";
import { logout } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { showSuccess, showError } from "../utils/toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(res.data);

    console.log("res.data", res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      showError("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profileImage", image);

      await axios.put(
        "http://localhost:5000/api/users/profile/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showSuccess("Profile update sucessfully");

      setPreview(null);
      setImage(null);
      fetchProfile();
    } catch (error) {
      let message = error.response?.data.message || " Profile update failed";
    }
  };

  if (!user) return <div>Loading...</div>;

  const imageUrl =
    preview ||
    (user.profileImage
      ? `http://localhost:5000/uploads/${user.profileImage}`
      : defaultAvatar);

  return (
    <>
      <div className="home-container">
        <Navbar />

        <div className="profile-container">
          <div className="profile-card">
            <h2>Profile Page</h2>

           
            <img src={imageUrl} alt="Profile" className="profile-image" />

          
            <div className="upload-section">
              <input type="file" onChange={handleImageChange} />
              <button onClick={handleUpload}>Upload</button>
            </div>

            <hr />

           
            <div className="user-info">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

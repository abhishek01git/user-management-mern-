import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultAvatar from "../assets/default-avatar.png";
import "./AdminDashboard.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { toast } from "react-toastify";
import { showSuccess, showError } from "../utils/toast";

 

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);


   

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/search?search=${search}`,
        { headers }
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleDelete = (id) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p>⚠ Are you sure you want to delete this user?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px"
              }}
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:5000/api/admin/users/${id}`,
                    { headers }
                  );
                  showSuccess("User deleted successfully");
                  fetchUsers();
                } catch (error) {
                  showError("Delete failed");
                }
                closeToast();
              }}
            >
              Yes
            </button>

            <button onClick={closeToast}>Cancel</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  
  const handleEdit = (user) => {
    setIsEditing(true);
    setEditId(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      password: ""
    });

    setImage(null);
    setPreview(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const handleUpdate = () => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p>⚠ Confirm update changes?</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              style={{
                background: "#1890ff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px"
              }}
              onClick={async () => {
                try {
                  const formDataToSend = new FormData();

                  formDataToSend.append("name", formData.name);
                  formDataToSend.append("email", formData.email);

                  if (formData.password) {
                    formDataToSend.append("password", formData.password);
                  }

                  if (image) {
                    formDataToSend.append("profileImage", image);
                  }

                  await axios.put(
                    `http://localhost:5000/api/admin/users/${editId}`,
                    formDataToSend,
                    { headers }
                  );

                  showSuccess("User updated successfully 🎉");

                  setIsEditing(false);
                  setEditId(null);
                  setFormData({ name: "", email: "", password: "" });
                  setImage(null);
                  setPreview(null);

                  fetchUsers();
                } catch (error) {
                  showError("Update failed");
                }

                closeToast();
              }}
            >
              Confirm
            </button>

            <button onClick={closeToast}>Cancel</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

 
  const handleCreate = () => {
    if (!formData.name || !formData.email || !formData.password) {
      showError("All fields required");
      return;
    }

    toast.warn(
      ({ closeToast }) => (
        <div>
          <p>⚠ Create this new user?</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px"
              }}
              onClick={async () => {
                try {
                  const formDataToSend = new FormData();

                  formDataToSend.append("name", formData.name);
                  formDataToSend.append("email", formData.email);
                  formDataToSend.append("password", formData.password);
                  formDataToSend.append("role", "user");

                  if (image) {
                    formDataToSend.append("profileImage", image);
                  }

                  await axios.post(
                    "http://localhost:5000/api/admin/users",
                    formDataToSend,
                    { headers }
                  );

                  showSuccess("User created successfully");

                  setFormData({ name: "", email: "", password: "" });
                  setImage(null);
                  setPreview(null);

                  fetchUsers();
                } catch (error) {
                  showError("Creation failed - Email already taken");
                }

                closeToast();
              }}
            >
              Confirm
            </button>

            <button onClick={closeToast}>Cancel</button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      <input
        className="admin-search"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="logout-btn"
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        Logout
      </button>

      <hr />

      
      <div className="admin-card">
        <h3>{isEditing ? "Edit User" : "Create User"}</h3>

        <input
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        
        {!isEditing && (
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        )}

        
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

     
        {isEditing && !preview && (
          <img
            src={
              users.find((u) => u._id === editId)?.profileImage
                ? `http://localhost:5000/uploads/${
                    users.find((u) => u._id === editId).profileImage
                  }`
                : defaultAvatar
            }
            alt="Current"
            width="80"
            height="80"
          />
        )}

       
        {preview && (
          <img
            src={preview}
            alt="Preview"
            width="80"
            height="80"
          />
        )}

        {isEditing ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="admin-btn btn-primary"
              onClick={handleUpdate}
            >
              Update User
            </button>

            <button
              className="admin-btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setEditId(null);
                setFormData({ name: "", email: "", password: "" });
                setImage(null);
                setPreview(null);
              }}
            >
              Cancel Edit
            </button>
          </div>
        ) : (
          <button
            className="admin-btn btn-primary"
            onClick={handleCreate}
          >
            Create User
          </button>
        )}
      </div>

      <hr />

      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const imageUrl = user.profileImage
              ? `http://localhost:5000/uploads/${user.profileImage}`
              : defaultAvatar;

            return (
              <tr key={user._id}>
                <td>
                  <img src={imageUrl} alt="Profile" width="50" height="50" />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="admin-btn btn-primary"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-btn btn-primary"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
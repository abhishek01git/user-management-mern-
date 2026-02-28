const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");


const {
  getUsers,
  deleteUser,
  updateUser,
  searchUsers,
  createUser
} = require("../controllers/adminController");

router.get("/users", protect, adminOnly, getUsers);
router.get("/search", protect, adminOnly, searchUsers);
router.post("/users", protect, adminOnly, upload.single("profileImage"), createUser);
router.put(
  "/users/:id",
  protect,
  adminOnly,
  upload.single("profileImage"),
  updateUser
);
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;
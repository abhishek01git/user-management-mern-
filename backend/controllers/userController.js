const User = require("../models/User");

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.profileImage = req.file.filename;

    await user.save();

    res.json({
      message: "Profile image updated",
      profileImage: user.profileImage
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
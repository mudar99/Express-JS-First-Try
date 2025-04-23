const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (username, password) => {
  // Find user by username
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error("User not found");

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return { token, user };
};

module.exports = { login };

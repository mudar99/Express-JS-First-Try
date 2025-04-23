// scripts/createTestUser.js
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path to your User model

async function createTestUser() {
  const username = "mudar99";
  const password = "1234567890";

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    console.log("Test user created successfully:", user.username);
  } catch (error) {
    console.error("Error creating test user:", error);
  }
}

// Call the function
createTestUser().then(() => process.exit());

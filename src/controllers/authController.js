const authService = require("../services/authService");

const login = async (req, res, next) => {
  // Destructure username and password from the request body
  const { username, password } = req.body;

  // Log the received data for debugging
  console.log("Received data:", req.body);

  // Validate that both username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Call the authentication service to log in the user
    const data = await authService.login(username, password);
    // Respond with the JWT token if login is successful
    // res.json({ token });
    res.success("Login successfully", data, 200);
  } catch (err) {
    // Handle any errors that occur during login
    // res.status(401).json({ message: err.message });
    res.error(err.message, null, 401); // Not Found
  }
};

module.exports = { login };

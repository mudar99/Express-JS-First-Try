const jwt = require("jsonwebtoken");

// Middleware to check if the user is authenticated
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.error("No token provided", null, 401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.error("You don't have a permission to do that", null, 401); // Unauthorized
    }

    // If token is valid, save the user ID or any other relevant info to request for use in other routes
    req.userId = decoded.id; // Store user id from token payload
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { authenticate };

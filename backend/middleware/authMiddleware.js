const jwt = require("jsonwebtoken");
// Token blacklist
const tokenBlacklist = new Set();

exports.protectRoute = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Check if token is blacklisted
    if (tokenBlacklist.has(token)) {
      return res.status(403).json({ message: "Token has been logged out" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" });
  }
};

exports.authorization = (...roles) => {
  return (req, res, next) => {
    try {
      // Ensure req.user exists (set by protectRoute middleware)
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: No user data" });
      }

      // Check if the user's role is included in the allowed roles
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Access denied: Insufficient role" });
      }

      next();
    } catch (error) {
      console.error("Authorization middleware error:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

exports.tokenBlacklist = tokenBlacklist;

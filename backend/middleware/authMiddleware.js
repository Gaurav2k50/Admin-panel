const jwt = require("jsonwebtoken");

exports.protectRoute = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    console.log("----->", req.headers.authorization);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

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

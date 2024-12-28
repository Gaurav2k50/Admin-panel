const express = require("express");
const { Router } = require("express");
const { signUp, signIn, promoteUser } = require("../controller/userController");
const { protectRoute, authorization } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Route: Signup
router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/promote", protectRoute, authorization("SuperAdmin"), promoteUser);

module.exports = router;

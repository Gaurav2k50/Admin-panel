const express = require("express");
const { Router } = require("express");
const {
  signUp,
  signIn,
  logout,
  promoteUser,
} = require("../controller/userController");
const { protectRoute, authorization } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);
router.put("/promote", protectRoute, authorization("SuperAdmin"), promoteUser);

module.exports = router;

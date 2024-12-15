const express = require("express");
const { Router } = require("express");
const { signUp, signIn } = require("../controller/userController");

const router = express.Router();

// Public Route: Signup
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;

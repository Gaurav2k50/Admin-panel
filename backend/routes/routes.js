const express = require("express");
const userRoutes = require("./userRoute");
const candidateRoutes = require("./candidateRoute");
const employeeRoutes = require("./employeeRoute");
const leaveRouter = require("./leaveRoute");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/candidates", candidateRoutes);
router.use("/employees", employeeRoutes);
router.use("/leaves", leaveRouter);

module.exports = router;

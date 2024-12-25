const express = require("express");
const upload = require("../middleware/multer");
const { addEmployee } = require("../controller/employeeController");

const router = express.Router();

router.post("/", upload.single("profilePicture"), addEmployee);

module.exports = router;

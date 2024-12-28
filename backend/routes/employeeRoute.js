const express = require("express");
const upload = require("../middleware/multer");
const {
  addEmployee,
  getAllEmployee,
} = require("../controller/employeeController");

const router = express.Router();

router.post("/", upload.single("profilePicture"), addEmployee);

router.get("/allEmployee", getAllEmployee);

module.exports = router;

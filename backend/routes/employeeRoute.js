const express = require("express");
const upload = require("../middleware/multer");
const {
  addEmployee,
  getAllEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

const router = express.Router();

router.post("/add", upload.single("profilePicture"), addEmployee);

router.get("/list", getAllEmployee);

router.delete("/delete/:id", deleteEmployee);

module.exports = router;

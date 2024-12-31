const express = require("express");
const upload = require("../middleware/multer");
const {
  addEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

const router = express.Router();

router.post("/add", upload.single("profilePicture"), addEmployee);

router.get("/list", getAllEmployee);

router.put("/update/:id", upload.single("profile"), updateEmployee);

router.delete("/delete/:id", deleteEmployee);

module.exports = router;

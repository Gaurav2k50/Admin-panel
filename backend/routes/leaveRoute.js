const express = require("express");
const upload = require("../middleware/multer");
const { addLeave } = require("../controller/leaveController");

const router = express.Router();

// router.post("/add", upload.single("profile"), addLeave);
router.post(
  "/add",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "documents", maxCount: 1 },
  ]),
  addLeave
);

module.exports = router;

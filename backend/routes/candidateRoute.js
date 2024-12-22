const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addCandidate,
  getAllCandidates,
  deleteCandidate,
} = require("../controller/candidateController");

const router = express.Router();

// Set up file storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes/"); // Save files to 'uploads/resumes' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to prevent overwriting
  },
});

const upload = multer({ storage });

// POST route for adding candidate
router.post("/", upload.single("resume"), addCandidate);

router.get("/", getAllCandidates);

router.delete("/:id", deleteCandidate);

module.exports = router;

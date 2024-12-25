const Candidate = require("../models/candidateModel");

const addCandidate = async (req, res) => {
  const { name, email, phone, department, experience } = req.body;

  const resume = req.file ? req.file.path : null;

  if (!name || !email || !phone || !department || !experience || !resume) {
    return res.status(400).json({ message: "All fields are required " });
  }

  try {
    const newCandidate = new Candidate({
      name,
      email,
      phone,
      department,
      experience,
      resume,
    });
    await newCandidate.save();
    res.status(201).json({ message: "Candidate added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add candidate", error });
  }
};

// Controller method to get all candidates from the database
const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: "No candidate found" });
    }

    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch candidates", error });
  }
};

const deleteCandidate = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteCandidate = await Candidate.findByIdAndDelete(id);
    // console.log("Deleted Candidate:------>", deleteCandidate);

    if (!deleteCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete candidate", error });
  }
};

module.exports = {
  addCandidate,
  getAllCandidates,
  deleteCandidate,
};

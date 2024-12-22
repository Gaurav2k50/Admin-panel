const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { type: String, required: true },
});

module.exports = mongoose.model("Candidate", candidateSchema);

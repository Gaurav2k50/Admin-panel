const Leave = require("../models/leaveModel");

const addLeave = async (req, res) => {
  const { employeeName, date, reason, status } = req.body;

  try {
    // Validate required fields
    if (!employeeName || !date || !reason || !status) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    // Parse and validate the date
    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Please use yyyy-mm-dd." });
    }

    // Handle file upload for profile if provided
    const profilePath = req.files?.profile
      ? `/uploads/profile/${req.files.profile[0].filename}`
      : null;
    const documentsPath = req.files?.documents
      ? `/uploads/documents/${req.files.documents[0].filename}`
      : null;

    // Create a new leave record
    const newLeave = new Leave({
      profile: profilePath,
      employeeName,
      date: formattedDate,
      reason,
      status,
      documents: documentsPath,
    });

    // Save the record to the database
    await newLeave.save();

    res
      .status(201)
      .json({ message: "Leave added successfully.", data: newLeave });
  } catch (error) {
    console.error("Error adding leave:", error);
    res.status(500).json({
      message: "An unexpected error occurred while adding leave.",
      error: error.message,
    });
  }
};

module.exports = {
  addLeave,
};

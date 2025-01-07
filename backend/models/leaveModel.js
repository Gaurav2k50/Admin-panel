const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    profile: {
      type: String,
      required: false,
    },
    employeeName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      require: true,
    },
    documents: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leaveSchema);

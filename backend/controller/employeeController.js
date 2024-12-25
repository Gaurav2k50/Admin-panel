const express = require("express");
const Employee = require("../models/employeeModel");

const addEmployee = async (req, res) => {
  const { employeeName, email, phone, position, department, date, profile } =
    req.body;

  if (!employeeName) {
    return res.status(400).json({ message: "Employee name is required" });
  }

  try {
    // const dateParts = date.split("/");

    // const formattedDate = new Date(
    //   `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`
    // );

    // // Check if the date is valid
    // if (isNaN(formattedDate)) {
    //   return res.status(400).json({ message: "Invalid date format" });
    // }

    // Ensure the date is in yyyy-mm-dd format
    const formattedDate = new Date(date);

    // Check if the date is valid
    if (isNaN(formattedDate)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Please use yyyy-mm-dd." });
    }

    const profilePath = req.file
      ? `/uploads/profile/${req.file.filename}`
      : null;

    const newEmployee = new Employee({
      employeeName,
      email,
      phone,
      position,
      department,
      date: formattedDate,
      profile: profilePath,
    });

    await newEmployee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addEmployee,
};

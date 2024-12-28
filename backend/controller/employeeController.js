const express = require("express");
const Employee = require("../models/employeeModel");

const addEmployee = async (req, res) => {
  const { employeeName, email, phone, position, department, date } = req.body;

  try {
    if (
      !employeeName ||
      !email ||
      !phone ||
      !position ||
      !department ||
      !date
    ) {
      return res.status(400).json({ message: "All fields are required " });
    }

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

const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No Employee found" });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error in getAllEmployee:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred", error: error.message });
  }
};

module.exports = {
  addEmployee,
  getAllEmployee,
};
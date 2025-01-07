const express = require("express");
const Employee = require("../models/employeeModel");

const addEmployee = async (req, res) => {
  const { employeeName, email, phone, position, department, date, task } =
    req.body;

  try {
    if (
      !employeeName ||
      !email ||
      !phone ||
      !position ||
      !department ||
      !date ||
      !task
    ) {
      return res.status(400).json({ message: "All fields are required" });
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
      task,
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

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { employeeName, email, phone, position, department, date } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // Check if the date is valid if provided
    let formattedDate;
    if (date) {
      formattedDate = new Date(date);
      if (isNaN(formattedDate)) {
        return res
          .status(400)
          .json({ message: "Invalid date format. Please use yyyy-mm-dd." });
      }
    }

    // Handle profile image if uploaded
    const profilePath = req.file
      ? `/uploads/profile/${req.file.filename}`
      : undefined;

    // Build update object
    const updateData = {
      ...(employeeName && { employeeName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(position && { position }),
      ...(department && { department }),
      ...(formattedDate && { date: formattedDate }),
      ...(profilePath && { profile: profilePath }),
    };

    // Find and update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      message: "An error occurred while updating the employee",
      error: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate if ID is provided
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // Attempt to find and delete the employee
    const employeeToDelete = await Employee.findByIdAndDelete(id);

    if (!employeeToDelete) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({
      message: "An error occurred while trying to delete the employee",
      error: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
};

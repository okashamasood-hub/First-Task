const express = require("express");
const router = express.Router();

const employees = require("../models/employeeModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10); 
    limit = parseInt(limit, 10);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedEmployees = employees.slice(startIndex, endIndex);

    res.status(200).json({
      total: employees.length,
      page,
      limit,
      totalPages: Math.ceil(employees.length / limit),
      data: paginatedEmployees
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees"
    });
  }
});


router.get("/:id", authMiddleware, (req, res) => {
  try {
    const employee = employees.find(
      emp => emp.id === parseInt(req.params.id)
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employee"
    });
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const { name, email, department, role, salary } = req.body;

    if (!name || !email || !department || !role || !salary) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const newEmployee = {
      id: employees.length + 1,
      name,
      email,
      department,
      role,
      salary
    };

    employees.push(newEmployee);

    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee"
    });
  }
});

router.put("/:id", authMiddleware, (req, res) => {
  try {
    const employee = employees.find(
      emp => emp.id === parseInt(req.params.id)
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    const { name, email, department, role, salary } = req.body;

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.department = department || employee.department;
    employee.role = role || employee.role;
    employee.salary = salary || employee.salary;

    res.status(200).json({
      message: "Employee updated successfully",
      employee
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee"
    });
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  try {
    const employeeIndex = employees.findIndex(
      emp => emp.id === parseInt(req.params.id)
    );

    if (employeeIndex === -1) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    employees.splice(employeeIndex, 1);

    res.status(200).json({
      message: "Employee deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee"
    });
  }
});

module.exports = router;
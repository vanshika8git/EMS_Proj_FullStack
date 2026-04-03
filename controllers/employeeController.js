const Employee = require("../models/Employee");

// GET all employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// POST new employee
exports.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  const savedEmployee = await employee.save();
  res.status(201).json(savedEmployee);
};

//reset password
exports.resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await Employee.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
// UPDATE employee
exports.updateEmployee = async (req, res) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedEmployee);
};

// DELETE employee
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted successfully" });
};


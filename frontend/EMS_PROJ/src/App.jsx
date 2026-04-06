import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// --- CONFIGURATION ---
const BACKEND_URL = "https://your-render-link.onrender.com/employees"; 

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="navbar">
    <div className="logo text-2xl font-bold">EMS PRO</div>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/employees">Employee Details</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </nav>
);

const Home = () => (
  <div className="hero">
    <h1>Employee Management System</h1>
    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
      A powerful, real-time solution for managing your workforce. 
      Track departments, salaries, and personnel data with high-performance cloud synchronization.
    </p>
  </div>
);

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data from Render
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(BACKEND_URL);
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${BACKEND_URL}/${id}`);
        // Dynamic Update: Filter out the deleted employee from UI immediately
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (error) {
        alert("Action failed. Check console for details.");
      }
    }
  };

  if (loading) return <div className="hero"><h2>Syncing with database...</h2></div>;

  return (
    <div className="employee-grid">
      {employees.map((emp) => (
        <div key={emp._id} className="employee-card">
          <div className="emp-header">
            <div className="emp-name">{emp.name}</div>
            <div className="emp-dept">{emp.department}</div>
          </div>
          
          <div className="emp-details">
            <span><strong>Email:</strong> {emp.email}</span>
            <span><strong>Salary:</strong> ${emp.salary?.toLocaleString()}</span>
            <span><strong>ID:</strong> {emp._id.substring(0, 8)}...</span>
          </div>

          <div className="card-actions">
            <button className="btn btn-update">Update</button>
            <button 
              className="btn btn-delete" 
              onClick={() => handleDelete(emp._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- MAIN APP ---

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div className="hero"><h2>About Us</h2></div>} />
        <Route path="/employees" element={<EmployeeDetails />} />
        <Route path="/contact" element={<div className="hero"><h2>Contact Support</h2></div>} />
        <Route path="/login" element={<div className="hero"><h2>Login Section</h2></div>} />
        <Route path="/register" element={<div className="hero"><h2>Register Section</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
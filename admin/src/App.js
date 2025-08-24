import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AdminHome from "./Components/AdminHome/AdminHome";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import CategoryForm from "./Pages/CategoryForm";
import SubCategory from "./Pages/SubCategory";
import SubCategoryForm from "./Pages/SubCategoryForm";
import Enquiry from "./Pages/Enquiry";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './App.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={`sidebar bg-light p-3 ${isOpen ? 'open' : ''}`}>
      <h4 className="text-center">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/enquiry" onClick={toggleSidebar}>Enquiry</Link>
        </li>
        <button className="btn btn-primary mt-3" onClick={handleLogOut}>
          Logout
        </button>
      </ul>
    </div>
  );
};

const AdminPanel = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="d-flex">
        {isLoggedIn && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className="main-content flex-grow-1">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
            {isLoggedIn ? (
              <>
                <Route path="/home" element={<Enquiry />} />
                <Route path="/enquiry" element={<Enquiry />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminPanel;

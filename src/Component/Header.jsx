import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="logo" onClick={() => navigate("/")}>TaskTracker</div>
      <div className="header-right">
        {email && <span className="user-email">{email}</span>}
        {email && (
          <button className="header-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
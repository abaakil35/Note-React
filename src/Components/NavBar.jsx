import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [userName, setUserName] = useState(" loading ...");
    const [userLast, setLast] = useState("");
    
    useEffect(() => {
      
      const storedName = localStorage.getItem("first");
      const storedlast = localStorage.getItem("last");
      if (storedName && storedlast) {
          setUserName(storedName);
          setLast(storedlast);
      }
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-title">My Notes</div>
      <div className="navbar-username">
        {userName} {userLast}
      </div>
      <div className="navbar-menu">
        <button className="menu-button">☰</button>
        <div className="dropdown">
          <a href="#" className="dropdown-item">Change Password</a>
          <a href="#" className="dropdown-item">About Me</a>
          <a href="#" className="dropdown-item">Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

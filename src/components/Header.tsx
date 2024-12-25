import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <button className="nav-button">Schools and Majors</button>
        <button className="nav-button">Required and Recommended Courses</button>
        <button className="nav-button">Course Plan</button>
      </nav>
    </header>
  );
};

export default Header;
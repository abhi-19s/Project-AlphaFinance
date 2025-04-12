import React, { useState } from "react";
import { FiHome, FiUser, FiMenu } from "react-icons/fi";
import { SiBitcoin } from 'react-icons/si';
import { FaChartLine } from 'react-icons/fa';
import { FaRocket ,FaFileContract} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import "./Nav.css";

const Sidebar = () => { 
  const [isOpen, setIsOpen] = useState(true);

  return (
      <div className="sidebar-container">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            <FiMenu size={20} />
          </button>
          <div className="logo">{isOpen ? "" : ""}</div>
          <ul className="nav-links">
            <li>
              <NavLink
                  to="/market"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  end
              >
                <FiHome size={20} />
                <span className={isOpen ? "show" : "hide"}>Overview</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                  to="/market/stock-exchange"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <FaChartLine size={20} />
                <span className={isOpen ? "show" : "hide"}>Stock Exchanges</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                  to="/market/ipo"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <FaRocket size={20} />
                <span className={isOpen ? "show" : "hide"}>IPO</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                  to="/market/crypto"
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <SiBitcoin size={20} />
                <span className={isOpen ? "show" : "hide"}>Crypto</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="main-content">
          <Outlet />
        </div>
      </div>
  );
};

export default Sidebar;

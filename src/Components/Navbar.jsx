// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard/profile" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard/settings" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/dashboard/feedback" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Feedback
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/logout" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

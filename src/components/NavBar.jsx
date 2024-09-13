import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/tutorials">Manage Tutorials</Link></li>
        <li><Link to="/add-tutorial">Add Tutorial</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;

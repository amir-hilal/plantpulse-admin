import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="surface-0 border-bottom-1 surface-border shadow-2">
      <div className="grid align-items-center justify-content-between p-3">
        {/* Left Side (Logo/Title) */}
        <div className=" flex align-items-center">
          <Link to="/" className="text-2xl text-primary font-bold">PlantPulse</Link>
        </div>

        {/* Center Links for desktop */}
        <div className=" flex justify-content-center hidden md:flex">
          <ul className="flex  w-auto gap-3 align-items-center list-none p-0 m-0">
            <li><Link to="/" className="text-lg text-secondary no-underline w-auto text-grey hover:text-primary">Dashboard</Link></li>
            <li><Link to="/tutorials" className="text-lg text-secondary no-underline w-auto">Tutorials</Link></li>
            <li><Link to="/add-tutorial" className="text-lg text-secondary no-underline w-auto">Add Tutorial</Link></li>
          </ul>
        </div>

        {/* Right Side (User profile icon) */}
        <div className=" flex align-items-center justify-content-end">
          <Link to="/profile">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              alt="user profile"
              className="border-circle"
              style={{ width: '40px', height: '40px' }}
            />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="col flex md:hidden justify-content-end">
          <button className="p-button p-button-text p-button-primary">
            <i className="pi pi-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

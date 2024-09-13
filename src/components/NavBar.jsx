import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

const NavBar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };
  // Function to close the mobile menu when resizing to a larger screen
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      // md breakpoint (768px)
      setMobileMenuVisible(false);
    }
  };

  // Add event listener for resizing
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <nav className="bg-secondary border-bottom-1 surface-border shadow-1 p-3">
      <div className="flex align-items-center justify-content-between p-0">
        {/* Left Side (Logo/Title) */}
        <div className=" flex align-items-center">
          <img
            src={logo}
            alt="App Logo"
            height={40}
            className="cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Center Links for desktop */}

        <div className="hidden md:flex   justify-content-center hidden md:flex">
          <ul className="flex gap-3 align-items-center list-none p-0 m-0">
            <li>
              <Link
                to="/"
                className="text-lg text-tint-5 no-underline hover:text-primary"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/tutorials"
                className="text-lg text-tint-5 no-underline hover:text-primary"
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                to="/add-tutorial"
                className="text-lg text-tint-5 no-underline hover:text-primary"
              >
                Add Tutorial
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side (User profile icon) */}
        <div className=" p-0 hidden md:flex align-items-center justify-content-end">
          <Link to="/profile">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              alt="user profile"
              className="border-circle"
              style={{ width: '40px', height: '40px' }}
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className=" p-0 flex md:hidden justify-content-end">
          <button
            onClick={toggleMobileMenu}
            className="text-tint-5 text-2xl cursor-pointer bg-transparent border-none"
          >
            <i className="pi pi-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {mobileMenuVisible && (
        <div className="bg-secondary flex p-0 flex-column gap-2 p-3 align-items-end">
          <Link to="/profile">
            <img
              src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
              alt="user profile"
              className="border-circle"
              style={{ width: '40px', height: '40px' }}
            />
          </Link>
          <Link
            to="/"
            className="text-lg text-grey no-underline hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            to="/tutorials"
            className="text-lg text-grey no-underline hover:text-primary"
          >
            Tutorials
          </Link>
          <Link
            to="/add-tutorial"
            className="text-lg text-grey no-underline hover:text-primary"
          >
            Add Tutorial
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

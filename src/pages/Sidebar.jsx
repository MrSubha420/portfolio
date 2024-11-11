// Sidebar.jsx
import React from "react";
import { Link } from "react-scroll";
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon from react-icons

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 bg-gray-900 text-white shadow-lg transition-transform transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-20 h-70 sm:w-40 sm:h-70 z-20 flex flex-col items-start`} // Set mobile and desktop width and height
    >
      <div className="flex items-center justify-between w-full p-4">
        <h2 className="text-xl font-bold hidden sm:block">Menu</h2> {/* Hidden on small screens */}
        <button onClick={toggleSidebar} className="text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link to="hero" smooth={true} duration={500} className="hover:text-gray-400" onClick={toggleSidebar}>
          Home
        </Link>
        <Link to="timeline" smooth={true} duration={500} className="hover:text-gray-400" onClick={toggleSidebar}>
          Timeline
        </Link>
        <Link to="about" smooth={true} duration={500} className="hover:text-gray-400" onClick={toggleSidebar}>
          About
        </Link>
        <Link to="skills" smooth={true} duration={500} className="hover:text-gray-400" onClick={toggleSidebar}>
          Skills
        </Link>
        <Link to="portfolio" smooth={true} duration={500} className="hover:text-gray-400" onClick={toggleSidebar}>
          projects
        </Link>
        <Link to="myapps" smooth={true} duration={500} className="hover:text-gray-400" onClick={toggleSidebar}>
          Achievements
        </Link>
        <Link to="contact" smooth={true} duration={500} className="hover:text-gray-400" onClick={toggleSidebar}>
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

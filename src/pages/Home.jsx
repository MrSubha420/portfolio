// Home.jsx
import React, { useState } from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import Sidebar from "./Sidebar"; // Import Sidebar component

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Three-dot button to open the sidebar */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded focus:outline-none z-10"
      >
        <span className="block w-8 h-0.5 bg-white mb-1"></span>
        <span className="block w-8 h-0.5 bg-white mb-1"></span>
        <span className="block w-8 h-0.5 bg-white"></span>
      </button>

      {/* Sidebar for navigation */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
        <div id="hero" className="mb-10"><Hero /></div>
        <div id="timeline" className="mb-10"><Timeline /></div>
        <div id="about" className="mb-10"><About /></div>
        <div id="skills" className="mb-10"><Skills /></div>
        <div id="portfolio" className="mb-10"><Portfolio /></div>
        <div id="myapps" className="mb-10"><MyApps /></div>
        <div id="contact" className="mb-10"><Contact /></div>
      </article>
    </div>
  );
};

export default Home;

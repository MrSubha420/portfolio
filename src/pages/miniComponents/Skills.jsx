import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faMicrochip,
  faDesktop,
  faServer,
  faDatabase,
  faMobileAlt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const containerRef = useRef(null); // Ref to the scroll container
  const [activeCategory, setActiveCategory] = useState(0); // Track active category
  const [isMobile, setIsMobile] = useState(false); // Track if the screen is mobile

  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-production-bf5d.up.railway.app/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  useEffect(() => {
    // Detect screen size change for mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // 640px or less is considered mobile
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const scrollIntervalTime = isMobile ? 5000 : 500; // 5 seconds for mobile, 2 seconds for others

    const scrollInterval = setInterval(() => {
      setActiveCategory((prevIndex) => {
        const nextIndex = (prevIndex + 1) % categories.length;
        return nextIndex;
      });
    }, scrollIntervalTime);

    return () => clearInterval(scrollInterval); // Cleanup on unmount
  }, [isMobile]); // Re-run when screen size changes

  const categorizeSkills = (skills) => {
    const categories = {
      coreProgramming: [],
      iot: [],
      frontend: [],
      backend: [],
      database: [],
      appDevelopment: [],
      others: [],
    };

    skills.forEach((skill) => {
      if (skill.proficiency >= 80 && skill.proficiency <= 90) {
        categories.coreProgramming.push(skill);
      } else if (skill.proficiency >= 70 && skill.proficiency < 80) {
        categories.iot.push(skill);
      } else if (skill.proficiency >= 60 && skill.proficiency < 70) {
        categories.frontend.push(skill);
      } else if (skill.proficiency >= 50 && skill.proficiency < 60) {
        categories.backend.push(skill);
      } else if (skill.proficiency >= 40 && skill.proficiency < 50) {
        categories.database.push(skill);
      } else if (skill.proficiency >= 30 && skill.proficiency < 40) {
        categories.appDevelopment.push(skill);
      } else {
        categories.others.push(skill);
      }
    });

    return categories;
  };

  const categorizedSkills = categorizeSkills(skills);

  const categories = [
    { key: "coreProgramming", title: "Core Programming", icon: faCode },
    { key: "iot", title: "IoT|AI|ML|DS", icon: faMicrochip },
    { key: "frontend", title: "Front-end", icon: faDesktop },
    { key: "backend", title: "Back-end", icon: faServer },
    { key: "database", title: "Database", icon: faDatabase },
    { key: "appDevelopment", title: "App Development", icon: faMobileAlt },
    { key: "others", title: "Others", icon: faQuestionCircle },
  ];

  const renderSkillIcons = (skillsArray) => (
    <div className="flex flex-wrap justify-center gap-4">
      {skillsArray.map((skill) => (
        <div
          key={skill._id}
          className="flex flex-col items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
        >
          <img
            src={skill.svg && skill.svg.url}
            alt={skill.title}
            className="h-12 w-auto object-contain"
          />
          <p className="text-gray-700 dark:text-gray-300 mt-2 text-xs font-medium">
            {skill.title}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full  flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <hr className="border-gray-300 dark:border-gray-600" />
        <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
          Skills
        </h1>

        <div className="relative">
          {/* Mobile view: Show categories horizontally */}
          <div className="sm:hidden overflow-x-auto">
            <div className="flex gap-4" ref={containerRef}>
              {categories.map((category, index) =>
                categorizedSkills[category.key].length > 0 ? (
                  <div
                    className={`p-4 w-auto ${
                      activeCategory === index ? "block" : "hidden"
                    } transition-all duration-500 ease-in-out`}
                    key={category.key}
                  >
                    <div className="flex mb-6 items-center">
                      <div className="relative flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full mr-4">
                        <FontAwesomeIcon icon={category.icon} />
                      </div>
                      <h2 className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 font-semibold">
                        {category.title}
                      </h2>
                    </div>
                    {/* Category Card for Skills with background color */}
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg h-[300px] overflow-auto">
                      {renderSkillIcons(categorizedSkills[category.key])}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Non-mobile view (Tablet and Desktop): Show all categories vertically */}
          <div className="hidden sm:flex flex-col gap-1">
            {categories.map((category, index) =>
              categorizedSkills[category.key].length > 0 ? (
                <div
                  className={`flex flex-col p-1 ${
                    activeCategory === index
                      ? "opacity-500 transition-opacity duration-500"
                      : "opacity-100 transition-opacity duration-500"
                  }`}
                  key={category.key}
                >
                  <div className="flex mb-6 items-center">
                    <div className="relative flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full mr-4">
                      <FontAwesomeIcon icon={category.icon} />
                    </div>
                    <h2 className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 font-semibold">
                      {category.title}
                    </h2>
                  </div>
                  {/* Category Card for Skills with background color */}
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                    {renderSkillIcons(categorizedSkills[category.key])}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

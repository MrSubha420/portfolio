import axios from "axios";
import React, { useEffect, useState } from "react";
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

  // Helper function to categorize skills
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
          <p className="text-gray-700 dark:text-gray-300 mt-2 text-xs font-medium">{skill.title}</p>
        </div>
      ))}
    </div>
  );

  const renderSkillsSection = (category, title, icon) => (
    categorizedSkills[category].length > 0 && (
      <div className="flex mb-12">
        <div className="flex flex-col items-center mr-4">
          <div className="relative flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full">
            <FontAwesomeIcon icon={icon} />
          </div>
          <div className="flex-1 border-l-2 border-blue-500 mt-2 h-full"></div>
        </div>
        <div className="w-full">
          <h2 className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 font-semibold mb-4 text-left">
            {title}
          </h2>
          {renderSkillIcons(categorizedSkills[category])}
        </div>
      </div>
    )
  );

  return (
    <div className="w-full flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skills Heading */}
        <hr className="border-gray-300 dark:border-gray-600" />
        <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        Skills</h1>

        {/* Skills Sections */}
        <div className="relative">
          {renderSkillsSection("coreProgramming", "Core Programming", faCode)}
          {renderSkillsSection("iot", "IoT|AI|ML|DS",faMicrochip)}
          {renderSkillsSection("frontend", "Front-end", faDesktop)}
          {renderSkillsSection("backend", "Back-end", faServer)}
          {renderSkillsSection("database", "Database", faDatabase)}
          {renderSkillsSection("appDevelopment", "App Development", faMobileAlt)}
          {renderSkillsSection("others", "Others", faQuestionCircle)}
        </div>
      </div>
    </div>
  );
};

export default Skills;

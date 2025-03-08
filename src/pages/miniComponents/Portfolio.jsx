import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-dun-two.vercel.app/api/v1/projrct/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();

    // Detect screen size for mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile view for screens <= 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : projects.length - 1
    );
  };

  const handleNext = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex < projects.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="w-full flex flex-col gap-12 py-8 bg-gray-50 dark:bg-gray-900">
      {/* Heading */}
      <div className="relative mb-12 text-center">
        <hr className="border-gray-300 dark:border-gray-600" />
        <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
          PROJECTS
        </h1>
      </div>

      {isMobile ? (
        // Mobile View - Single Card Navigation
        <>
          <div className="flex flex-col items-center">
            {projects && projects.length > 0 && (
              <Card
                key={projects[currentProjectIndex]._id}
                className="p-6 bg-white dark:bg-gray-800 shadow-lg dark:shadow-md rounded-lg w-[90%] transition-transform transform"
              >
                {/* Project Banner */}
                <img
                  src={
                    projects[currentProjectIndex].projectBanner &&
                    projects[currentProjectIndex].projectBanner.url
                  }
                  alt={projects[currentProjectIndex].title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />

                {/* Project Title */}
                <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">
                  {projects[currentProjectIndex].title}
                </h2>

                {/* Project Details Button */}
                <Link to={`/project/${projects[currentProjectIndex]._id}`}>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
                    Project Details
                  </Button>
                </Link>
              </Card>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-8 mt-0.5"> {/* Reduced margin-top */}
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={handlePrev}
            >
              Prev
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        // Desktop View - Grid Layout
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-8 md:px-12">
          {projects &&
            projects.map((element) => (
              <Card
                key={element._id}
                className="p-6 bg-white dark:bg-gray-800 shadow-lg dark:shadow-md rounded-lg transition-transform transform hover:scale-105"
              >
                {/* Project Banner */}
                <img
                  src={element.projectBanner && element.projectBanner.url}
                  alt={element.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />

                {/* Project Title */}
                <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">
                  {element.title}
                </h2>

                {/* Project Details Button */}
                <Link to={`/project/${element._id}`}>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
                    Project Details
                  </Button>
                </Link>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;

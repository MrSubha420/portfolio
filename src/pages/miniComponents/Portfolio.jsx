import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-production-bf5d.up.railway.app/api/v1/projrct/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  return (
    <div className="w-full flex flex-col gap-12 py-8 bg-gray-50 dark:bg-gray-900">
      {/* Heading */}
      <div className="relative mb-12 text-center">
        <hr className="border-gray-300 dark:border-gray-600" />
        <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        PROJECTS
      </h1>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 sm:px-8 md:px-12">
        {viewAll
          ? projects &&
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
            ))
          : projects &&
            projects.slice(0, 9).map((element) => (
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

      {/* Show More / Show Less Button */}
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button
            className="w-52 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

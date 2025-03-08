import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-dun-two.vercel.app/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApplications);
    };
    getMyApps();
  }, []);

  return (
    <div className="w-full flex flex-col gap-10 sm:gap-16 py-8 bg-gray-50 dark:bg-gray-900">
      {/* Heading */}
      <hr className="border-gray-300 dark:border-gray-600" />
      <h1 className="text-tubeLight-effect text-[1.30rem] sm:text-[2.25rem] md:text-[2.50rem] lg:text-[3.30rem] tracking-[15px] dancing_text mx-auto w-fit">
  ACHIEVEMENTS
</h1>



      {/* Apps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 sm:px-8 md:px-12">
        {apps &&
          apps.map((element) => (
            <Card
              className="p-6 bg-white dark:bg-gray-800 shadow-lg dark:shadow-md rounded-lg transition-transform transform hover:scale-105"
              key={element._id}
            >
              {/* Achievement Image */}
              <img
                src={element.svg && element.svg.url}
                alt="achievement-skill"
                className="h-48 w-auto object-cover rounded-md mb-4"
              />

              {/* App Name */}
              <p className="text-lg font-bold text-gray-700 dark:text-gray-300 text-center">
                {element.name}
              </p>

              {/* View Button */}
              <Link to={element.svg && element.svg.url} target="_blank">
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all">
                  View
                </button>
              </Link>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default MyApps;

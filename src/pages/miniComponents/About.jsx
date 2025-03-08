import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Card } from "@/components/ui/card"; // Make sure this component uses Tailwind-compatible styling

const About = () => {
  const [user, setUser] = useState({});
  const [shape, setShape] = useState("rounded-full"); // Start with circle
  const [bgColor, setBgColor] = useState("bg-sky-500"); // Start with sky color

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-dun-two.vercel.app/api/v1/user/me/portfolio",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getMyProfile();
  }, []);

  useEffect(() => {
    const shapes = ["rounded-full", "hexagon", "square"]; // Hexagon will be handled with custom CSS
    const colors = ["bg-sky-500", "bg-green-300", "bg-turquoise-500"];
    let index = 0;

    const interval = setInterval(() => {
      setShape(shapes[index]);
      setBgColor(colors[index]);
      index = (index + 1) % shapes.length;
    }, 5000); // Change shape and color every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <div className="relative about-container flex flex-col items-center py-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <hr className="border-blue-300 dark:border-gray-600 mb-4" />
        <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
          ABOUTME
        </h1>
        <p className="uppercase text-lg text-gray-500 dark:text-gray-300 text-center max-w-xl">
          Allow me to introduce myself.
        </p>
      </div>

      <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 gap-10 my-12">
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={user?.avatar?.url || "/default-avatar.png"} // Fallback avatar image
              alt="avatar"
              className={`transition-all duration-1000 ease-in-out p-1 h-[240px] sm:h-[340px] md:h-[380px] lg:h-[450px] object-cover ${shape === 'hexagon' ? 'hexagon' : shape} ${bgColor} shadow-lg transform hover:scale-105`}
            />
          </div>

          {/* About Text Section */}
          <div className="flex justify-center flex-col text-gray-700 dark:text-gray-300 gap-6 tracking-wide">
            <Card className="p-6 shadow-xl bg-white dark:bg-gray-800 rounded-lg transition-transform hover:shadow-2xl hover:scale-[1.02]">
              <p className="text-justify">
                Hi there, I'm <span className="font-bold">Subhadip Manna</span>.
                My journey in technology is an exciting adventure filled with
                learning and innovation. I have a strong passion for IoT, Data
                Science, Machine Learning, Quantum Technology, and Full Stack
                App Development. For me, coding is not just work—it's a creative
                playground where ideas come to life.
              </p>
              <p className="text-justify">
                I enjoy building solutions that are both innovative and
                practical. Whether it's developing a new app or exploring the
                latest in quantum technology, I love diving into new challenges
                and finding smart solutions.
              </p>
              <p className="text-justify">
                Beyond technology, I love traveling and discovering new places.
                Exploring different cultures and landscapes gives me fresh ideas
                and perspectives. I also have a soft spot for cricket. The
                strategy and teamwork in the game inspire me in my
                problem-solving approach.
              </p>
              <p className="text-justify">
                At home, my family and friends bring me joy and remind me to
                enjoy the simple things in life. Their playful nature helps me
                relax and recharge.
              </p>
            </Card>
          </div>
        </div>

        <div className="text-center text-gray-600 dark:text-gray-400 tracking-wider text-lg my-6 max-w-3xl">
          My dedication and perseverance in timely delivery of work are integral
          to me. I maintain the courage to face any challenges for extended
          periods.
        </div>
      </div>
    </div>
  );
};

export default About;

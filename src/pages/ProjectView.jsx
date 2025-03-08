
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`https://portfolio-backend-dun-two.vercel.app/api/v1/projrct/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-screen sm:gap-4 sm:py-4 bg-gray-100 dark:bg-gray-800">
      <div className="w-full px-5 md:w-[1000px] pb-5">
        <div className="space-y-12">
          <div className="border-b border-gray-300 dark:border-gray-700 pb-12">
            <div className="flex justify-end mb-4">
              <Button onClick={handleReturnToPortfolio}>
                Return to Portfolio
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h1>
                <img
                  src={projectBannerPreview || "/avatarHolder.jpg"}
                  alt="projectBanner"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full">
                <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">Description:</p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                  {descriptionList.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full">
                <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">Technologies:</p>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                  {technologiesList.map((item, index) => (
                    <li key={index} className="mb-1">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="w-full">
                <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">Stack:</p>
                <p className="text-gray-700 dark:text-gray-300">{stack}</p>
              </div>
              <div className="w-full">
                <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">Deployed:</p>
                <p className="text-gray-700 dark:text-gray-300">{deployed}</p>
              </div>
              <div className="w-full">
                <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">Github Repository Link:</p>
                <Link className="text-blue-600 dark:text-blue-400" target="_blank" to={gitRepoLink}>
                  {gitRepoLink}
                </Link>
              </div>
              <div className="w-full">
                <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">Project Link:</p>
                <Link className="text-blue-600 dark:text-blue-400" target="_blank" to={projectLink}>
                  {projectLink}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProjectView;

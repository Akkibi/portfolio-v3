import { useCallback, useEffect, useMemo } from "react";
import { ProjectType } from "../Types";
import projectsData from "../data.json";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = useMemo<ProjectType | undefined>(() => {
    return projectsData.find((p) => p.name === location.pathname.split("/")[1]);
  }, [location]);

  const [visual, setVisual] = React.useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {project && (
        <>
          {visual && (
            <div
              onClick={() => {
                setVisual(null);
              }}
              className="inset-0 fixed z-50 top-0 left-0 backdrop-blur-lg cursor-pointer"
            >
              <div
                className="h-full w-full opacity-50 absolute inset-0 -z-10"
                style={{ backgroundColor: project.colors[1] }}
              ></div>
              <img src={visual} className="h-full w-full object-contain" />
            </div>
          )}
          <Link
            to={"/"}
            tabIndex={0}
            className="fixed z-20 top-auto bottom-5 left-auto right-5 sm:top-10 sm:bottom-auto sm:left-10 h-10 w-10 rounded-full"
            style={{ backgroundColor: project.colors[0] }}
            id="back"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <title>back</title>
              <path
                stroke={project.colors[1]}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </Link>
          <div className="w-full">
            <div className="fixed h-40 w-full bottom-0 -z-10">
              <div
                className="gap-20 h-40 items-center flex w-full justify-center"
                style={{ backgroundColor: project.colors[0] }}
              >
                <Button path={"/"} innerSite={true} color={project.colors[1]}>
                  Home
                </Button>
                <Button
                  path={"/about"}
                  innerSite={true}
                  color={project.colors[1]}
                >
                  About
                </Button>
              </div>
            </div>
            <div
              className="mb-40"
              style={{
                color: project.colors[0],
                backgroundColor: project.colors[1],
              }}
            >
              <div className="px-5 sm:px-[7vw] pb-32 md:px-8vw">
                <div className="relative w-full pb-[10vh]">
                  <div className="bg-primary absolute inset-0 z-0 opacity-10"></div>
                  <picture className=" relative z-10 max-h-[120vh] w-full bg-center object-contain">
                    <source
                      srcSet={`/assets/${project.name}/${project.webpImages[0]}`}
                      type="image/webp"
                    />
                    <img
                      className="relative z-10 max-h-[120vh] w-full bg-center object-contain"
                      src={`/assets/${project.name}/${project.images[0]}`}
                    />
                  </picture>
                </div>
                <h2
                  className="m-0 font-primaryFont text-4xl sm:text-5xl"
                  id="projectTitle"
                >
                  {project.title}
                </h2>
                <div className="mb-40 flex flex-col gap-10 font-secondaryFont md:flex-row ">
                  {project.list || project.link ? (
                    <div className=" w-full">
                      <h3 className="font-medium mb-[5vh] mt-[10vh]">
                        DÉTAILS DU PROJET
                      </h3>
                      {project.list && (
                        <>
                          {Object.entries(project.list).map(
                            ([key, value], index) => (
                              <React.Fragment key={`${key}-${index}`}>
                                {index !== 0 && (
                                  <hr
                                    key={`${key}-${index}-hr`}
                                    className=" border border-solid opacity-50 my-5"
                                    style={{ borderColor: project.colors[0] }}
                                  />
                                )}
                                <div
                                  key={`${key}-${index}`}
                                  className="flex place-content-between gap-5"
                                >
                                  <p className="uppercase">{key}</p>
                                  <p className="text-right">{value}</p>
                                </div>
                              </React.Fragment>
                            )
                          )}
                        </>
                      )}

                      {project.link && (
                        <>
                          <hr
                            className="border border-solid opacity-50 my-5"
                            style={{ borderColor: project.colors[0] }}
                          />
                          <div className="flex place-content-between items-center">
                            <p>LIEN</p>
                            <Button
                              path={project.link[0]}
                              innerSite={false}
                              color={project.colors[0]}
                            >
                              {project.link[1]}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="w-full">
                    <h3 className="font-medium mb-[5vh] mt-[10vh]">
                      DESCRIPTION
                    </h3>
                    {project.description.map((paragraph, index) => (
                      <p key={index} className="m-0 mb-4 inline-block">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                {project.videos?.map((video, index) => {
                  return (
                    <div key={index} className="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                })}
                <div className=" m-2  grid grid-cols-1 sm:grid-cols-2 gap-10 sm:mx-0">
                  {project.images?.map((image, index) => {
                    if (index > 0) {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setVisual(`/assets/${project.name}/${image}`);
                          }}
                          className="group relative aspect-square w-full md:aspect-video cursor-pointer"
                        >
                          <div
                            className="absolute left-0 top-0 h-full w-full opacity-10"
                            style={{ backgroundColor: project.colors[0] }}
                          ></div>
                          <picture>
                            <source
                              srcSet={`/assets/${project.name}/${project.webpImages[index]}`}
                              type="image/webp"
                            />
                            <img
                              className="object-fit absolute left-0 top-0 z-10 h-full w-full object-contain"
                              src={`/assets/${project.name}/${project.images[index]}`}
                              alt={`${project.images[index]}`}
                            />
                          </picture>
                          <svg
                            className="text-primary absolute bottom-5 left-5 z-20 h-[1.5vh] w-[1.5vh] opacity-0 duration-150 group-hover:opacity-100"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          >
                            <path d="M 6 1 h -5 v 21 h 21 v -5"></path>
                            <path d="M 7 16 L 22 1"></path>
                            <path d="M 10 1 h 12 v 12"></path>
                          </svg>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="mt-[7.5vh] w-full"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectPage;

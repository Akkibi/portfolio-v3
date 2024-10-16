import { useCallback, useEffect, useMemo } from "react";
import { ProjectType } from "../Types";
import projectsData from "../data.json";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const [delayFinished, setDelayFinished] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const project = useMemo<ProjectType | undefined>(() => {
    return projectsData.find((p) => p.name === location.pathname.split("/")[1]);
  }, [location]);

  const [visual, setVisual] = React.useState<string | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (visual != null) {
          setVisual(null);
        } else {
          navigate("/");
        }
      }
    },
    [navigate, visual]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // add a delay on the load of the page
  useEffect(() => {
    const delay = setTimeout(() => {
      setDelayFinished(true);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {delayFinished && project && (
        <>
          {visual && (
            <div className="inset-0 fixed z-50 top-0 left-0 backdrop-blur-lg cursor-pointer">
              <div
                className="h-full w-full opacity-50 absolute inset-0 -z-10"
                style={{ backgroundColor: project.colors[1] }}
              ></div>
              <img src={visual} className="h-full w-full object-contain" />
              <button
                onClick={() => {
                  setVisual(null);
                }}
                tabIndex={0}
                className="fixed z-20 top-auto bottom-5 left-auto right-5 sm:top-10 sm:bottom-auto sm:left-10 h-10 w-10 rounded-full"
                style={{ backgroundColor: project.colors[0] }}
                id="back"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <title>Close</title>
                  <path
                    stroke={project.colors[1]}
                    d="M 6 18 L 18 6 M 6 6 L 18 18"
                  ></path>
                </svg>
              </button>
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
            <div
              className="mb-40"
              style={{
                color: project.colors[0],
                backgroundColor: project.colors[1],
              }}
            >
              <div
                className="fixed h-40 w-full bottom-0 z-0"
                style={{ backgroundColor: project.colors[0] }}
              >
                <div className="gap-20 h-40 items-center flex w-full justify-center">
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
                className="px-5 sm:px-[7vw] pb-32 md:px-8vw z-10 relative"
                style={{ backgroundColor: project.colors[1] }}
              >
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

                <div
                  className={` m-2  grid grid-cols-1 ${
                    project.images.length > 2 ? "sm:grid-cols-2" : ""
                  } gap-10 sm:mx-0`}
                >
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
                              className="object-fit absolute left-0 top-0 z-10 h-full w-full object-contain group-hover:opacity-25 transition-opacity duration-150"
                              src={`/assets/${project.name}/${project.images[index]}`}
                              alt={`${project.images[index]}`}
                            />
                          </picture>
                          <svg
                            fill={project.colors[0]}
                            viewBox="0 0 25 25"
                            className="h-[4vh] opacity-0 z-40 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  transition-opacity duration-150"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M 4 13 H 3 v 9 h 9 v -1 H 4 z m 9 -9 h 8 v 8 h 1 V 3 h -9 z"></path>
                          </svg>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectPage;

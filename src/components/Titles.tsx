import { ProjectType } from "../Types";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TitlesProps {
  index: number;
  project: ProjectType;
  openProjectIndex: number;
}

const Titles: React.FC<TitlesProps> = ({
  index,
  project,
  openProjectIndex,
}) => {
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(titleRef.current, {
      clipPath: "inset(0% 0% 0% 100%)",
    });
  }, []);

  useGSAP(() => {
    if (openProjectIndex === index) {
      gsap.to(titleRef.current, {
        duration: 1,
        ease: "expo.inOut",
        clipPath: "inset(0% 0% 0% 0%)",
        overwrite: true,
      });
    } else {
      gsap.to(titleRef.current, {
        duration: 0.5,
        ease: "expo.out",
        clipPath: "inset(0% 100% 0% 0%)",
        overwrite: true,
        onComplete: () => {
          gsap.set(titleRef.current, {
            clipPath: "inset(0% 0% 0% 100%)",
          });
        },
      });
    }
  }, [openProjectIndex, index]);

  return (
    <div
      ref={titleRef}
      className="textStroke w-full h-full flex flex-col justify-end  items-start p-5 sm:p-10 absolute"
    >
      <h1
        className={`text-[13vw] leading-relaxed sm:text-[8vw] font-primaryFont font-bold stroke-outline`}
        style={{
          color: project.colors[0],
          WebkitTextStroke: `1rem ${project.colors[1]}`,
          textShadow: `-10px -10px 0 ${project.colors[1]}, 10px -10px 0 ${project.colors[1]}, -10px 10px 0 ${project.colors[1]}, 10px 10px 0 ${project.colors[1]}, 10px 0 0 ${project.colors[1]}, 0 10px 0 ${project.colors[1]}, -10px 0 0 ${project.colors[1]}, 0 -10px 0 ${project.colors[1]}`,
        }}
      >
        {project.title.toUpperCase()}
      </h1>
    </div>
  );
};

export default Titles;

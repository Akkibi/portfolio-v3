import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import projectsData from "../data.json";
import { useEffect, useState, useMemo, useCallback } from "react";
import Thumbnail from "./Thumbnail";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LocationState } from "../Types";
import Navbar from "./Navbar";
import Titles from "./Titles";
import { useNavigate } from "react-router-dom";

const toRad = (deg: number) => {
  return (deg * Math.PI) / 180;
};

const progressFromLocation = (location: LocationState) => {
  if (location.pathname.split("/")[1] == "about") {
    return -2;
  }
  const index = projectsData.findIndex(
    (p) => p.name === location.pathname.split("/")[1]
  );

  return index === -1 ? -1 : index;
};

const Slider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = window.innerWidth < 768;
  const prog = useMemo(() => progressFromLocation(location), [location]);
  const [progress, setProgress] = useState(Math.max(prog, 0));
  const isHome: boolean = useMemo(() => prog === -1, [prog]);
  // const isMobile = true;

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      const delta = e.deltaY * 0.005;
      setProgress((prev) =>
        Math.max(Math.min(prev + delta, projectsData.length - 1), 0)
      );
    },
    [setProgress]
  );

  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (touchStartY === null) return;
      const touchEndY = e.touches[0].clientY;
      const delta = (touchStartY - touchEndY) * 0.001;
      setProgress((prev) =>
        Math.max(Math.min(prev + delta, projectsData.length - 1), 0)
      );
    },
    [touchStartY, setProgress]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchStartY(null);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setProgress((prev) =>
          Math.max(Math.min(prev + 1, projectsData.length - 1), 0)
        );
      } else if (e.key === "ArrowLeft") {
        setProgress((prev) =>
          Math.max(Math.min(prev - 1, projectsData.length - 1), 0)
        );
      } else if (e.key === "Enter") {
        navigate(projectsData[Math.round(progress + 0.25)].name);
      }
    },
    [setProgress, navigate, progress]
  );

  useEffect(() => {
    if (!isHome) return;
    window.addEventListener("wheel", handleScroll, true);
    window.addEventListener("touchstart", handleTouchStart, true);
    window.addEventListener("touchmove", handleTouchMove, true);
    window.addEventListener("touchend", handleTouchEnd, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll, true);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchmove", handleTouchMove, true);
      window.removeEventListener("touchend", handleTouchEnd, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleScroll,
    isHome,
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
    handleKeyDown,
  ]);

  useGSAP(() => {
    if (prog === -1) {
      gsap.to("#canvas", {
        backgroundColor: "#111115",
        duration: 1,
        ease: "expo.Out",
        overwrite: true,
      });
    } else if (prog === -2) {
      gsap.to("#canvas", {
        backgroundColor: "#000000",
        duration: 1,
        ease: "expo.out",
        overwrite: true,
      });
    } else {
      setProgress(prog);
    }
  }, [prog]);

  return (
    <main className="z-10 relative">
      <Navbar progress={progress} isMobile={isMobile} isHome={isHome} />
      <div className="h-[100svh] w-full relative" id="canvas">
        <div className="h-full w-full absolute z-10 pointer-events-none">
          {projectsData.map((project, i) => (
            <Titles
              key={i}
              index={i}
              project={project}
              openProjectIndex={prog}
            />
          ))}
        </div>
        <Canvas
        //  frameloop="demand"
        >
          <OrthographicCamera
            makeDefault
            zoom={40}
            near={1}
            far={200}
            position={[0, 0, 100]}
          />
          <group rotation={[toRad(40), toRad(-40), 0]}>
            {projectsData.map((project, i) => (
              <Thumbnail
                key={i}
                index={i}
                project={project}
                progress={progress}
                isMobile={isMobile}
                isHome={isHome}
                isOpen={prog === i}
              />
            ))}
          </group>
        </Canvas>
      </div>
    </main>
  );
};

export default Slider;

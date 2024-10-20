import { useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import ThumbNailShader from "./ThumbnailShader";
import { progressScale, progressPosition, progressGrayScale } from "./Utils";
import { ProjectType } from "../Types";

interface ThumbnailProps {
  index: number;
  project: ProjectType;
  progress: number;
  isMobile: boolean;
  isHome: boolean;
  isOpen: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  index,
  project,
  progress,
  isMobile,
  isHome,
  isOpen,
}) => {
  const viewport = useThree((state) => state.viewport);
  const navigate = useNavigate();
  const planeRef = useRef<THREE.Mesh>(null!);
  // const { invalidate } = useThree();
  const planeScale = useMemo(() => {
    return {
      x: isMobile ? viewport.width - 1 : viewport.width - 3,
      y: isMobile ? viewport.width - 1 : viewport.height - 3,
    };
  }, [isMobile, viewport.width, viewport.height]);

  useGSAP(() => {
    const pos = progressPosition(
      (progress - index) * (isMobile ? 3 : 2),
      isMobile ? 3 : 8
    );
    const tlMove = gsap.timeline({
      paused: true,
      progress: 0,
      overwrite: true,
    });
    tlMove.to(
      planeRef.current.position,
      {
        // onUpdate: () => {
        //   invalidate();
        // },
        z: pos,
        duration: 1,
        overwrite: true,
        ease: "expo.out",
      },
      "0"
    );
    if (!isHome) {
      tlMove.play();
      return;
    }
    if (!isOpen) {
      tlMove
        .to(
          planeRef.current.scale,
          {
            x:
              window.innerHeight *
              0.004 *
              progressScale(progress - index) *
              (isMobile ? 0.8 : 1),
            y:
              window.innerHeight *
              0.004 *
              progressScale(progress - index) *
              (isMobile ? 0.8 : 1),
            duration: 1,
            overwrite: true,
            ease: "expo.out",
          },
          "0"
        )
        .to(
          planeRef.current.rotation,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            overwrite: true,
            ease: "expo.out",
          },
          "0"
        );
    } else {
      tlMove.to(
        planeRef.current.scale,
        {
          x: 0,
          y: 0,
          duration: 1,
          overwrite: true,
          ease: "expo.out",
        },
        "0"
      );
    }
    tlMove.play();
  }, [progress, isHome]);

  useGSAP(() => {
    if (isHome) return;
    // console.log("up");
    if (index === 0) {
      console.log("too mutch");
    }
    const tl = gsap.timeline({ paused: true, progress: 0, overwrite: true });
    if (!isOpen) {
      tl.to(
        planeRef.current.scale,
        {
          // onUpdate: () => {
          // invalidate();
          // },
          x: 0,
          y: 0,
          duration: 1,
          overwrite: true,
          ease: "expo.out",
        },
        "0"
      ).to(
        planeRef.current.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          overwrite: true,
          ease: "expo.out",
        },
        "0"
      );
    } else {
      tl.to(
        planeRef.current.rotation,
        {
          // onUpdate: () => {
          //   invalidate();
          // },
          x: -0.8308799419382282,
          y: 0.5148495139047413,
          z: 0.4946398262521617,
          duration: 1,
          overwrite: true,
          ease: "expo.out",
        },
        "0"
      )
        .to(
          planeRef.current.scale,
          {
            x: planeScale.x,
            y: planeScale.y,
            duration: 1,
            overwrite: true,
            ease: "expo.out",
          },
          "0"
        )
        .to(
          "#canvas",
          {
            backgroundColor: project.colors[1],
            duration: 1,
            overwrite: true,
            ease: "expo.out",
          },
          "0"
        );
    }
    tl.play();
  }, [isOpen, isHome, planeScale]);

  return (
    <mesh
      key={index}
      ref={planeRef}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/${e.eventObject.name}`);
      }}
      name={project.name}
    >
      <planeGeometry />
      <ThumbNailShader
        name={project.name}
        grayscale={progressGrayScale(progress - index)}
        planeScale={planeScale}
      />
    </mesh>
  );
};

export default Thumbnail;

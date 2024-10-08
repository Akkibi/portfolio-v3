import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const backgroundAiImageRef = useRef<HTMLDivElement>(null);
  const titleChangeRef = useRef<HTMLHeadingElement>(null);
  const titleContainerRef = useRef<HTMLHeadingElement>(null);
  const frenchflairRef = useRef<HTMLDivElement>(null);
  const paymenowRef = useRef<HTMLDivElement>(null);
  const musicaRef = useRef<HTMLDivElement>(null);
  const opquastRef = useRef<HTMLDivElement>(null);
  const introductionTextRef = useRef<HTMLParagraphElement>(null);
  const temoignage1Ref = useRef<HTMLDivElement>(null);
  const temoignage1part1Ref = useRef<HTMLImageElement>(null);
  const temoignage1part2Ref = useRef<HTMLImageElement>(null);
  const temoignage1sectionRef = useRef<HTMLDivElement>(null);
  const temoignage2Ref = useRef<HTMLDivElement>(null);
  const temoignage2part1Ref = useRef<HTMLImageElement>(null);
  const temoignage2part2Ref = useRef<HTMLImageElement>(null);
  const temoignage2sectionRef = useRef<HTMLDivElement>(null);
  const backToProjectsRef = useRef<HTMLDivElement>(null);
  const scrollIconRef = useRef<SVGSVGElement>(null);
  const expContainerRef = useRef<HTMLDivElement>(null);

  let titleSize = "10vh";

  if (window.innerWidth < 900) {
    titleSize = "8vh";
  }

  const [language, setLanguage] = useState("fr");
  const languages = useMemo(() => ["fr", "en", "jp"], []);

  const handleLanguageClick = useCallback(() => {
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];
    setLanguage(nextLanguage);
  }, [language, languages]);

  const refArrayTo3d = useMemo(
    () => [
      opquastRef,
      expContainerRef,
      introductionTextRef,
      temoignage1sectionRef,
      temoignage2sectionRef,
      backToProjectsRef,
    ],
    []
  );
  const tl = useRef<GSAPTimeline>();

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, clipPath: "inset(50% 50% 50% 50%)" },
        {
          duration: 2,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "expo.inOut",
        }
      );

      tl.current = gsap
        .timeline()
        .set(titleContainerRef.current, { x: "-50%", y: "-50%" })
        .set(titleChangeRef.current, {
          fontSize: titleSize,
          lineHeight: "15vh",
        })
        .set(frenchflairRef.current, { x: "-100%", opacity: 0 })
        .set(paymenowRef.current, { x: "100%", opacity: 0 })
        .set(musicaRef.current, { x: "-100%", opacity: 0 })
        .fromTo(
          backgroundAiImageRef.current,
          {
            opacity: 1,
            clipPath: "inset(50% 0% 50% 0%)",
          },
          {
            duration: 2,
            delay: 0.1,
            ease: "expo.inOut",
            clipPath: "inset(0% 0% 0% 0%)",
          }
        )
        .add("experiences", ">")
        .to(
          titleChangeRef.current,
          {
            duration: 0.5,
            ease: "expo.inOut",
            top: "-100%",
          },
          "experiences"
        )
        .to(
          introductionTextRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            opacity: 0,
          },
          "experiences"
        )
        .set(introductionTextRef.current, { display: "none" })
        .to(
          backgroundAiImageRef.current,
          {
            duration: 4,
            ease: "ease.out",
            opacity: 0,
          },
          "experiences+=1"
        )
        .set(backgroundAiImageRef.current, { display: "none" })
        .to(
          titleContainerRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            top: "0",
            left: "0",
            x: "30",
            y: "0",
          },
          "experiences+=1"
        )
        .to(
          titleChangeRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            fontSize: "5vh",
          },
          "experiences+=1"
        )
        .to(
          frenchflairRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            opacity: 1,
            x: 0,
          },
          "experiences+=1.5"
        )
        .to(
          paymenowRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            opacity: 1,
            x: 0,
          },
          "experiences+=1.6"
        )
        .to(
          musicaRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            opacity: 1,
            x: 0,
          },
          "experiences+=1.7"
        )
        .to(
          frenchflairRef.current,
          {
            duration: 1,
            ease: "expo.in",
            opacity: 0,
            x: "100%",
          },
          "experiences+=2.6"
        )
        .set(frenchflairRef.current, { display: "none" })
        .to(
          paymenowRef.current,
          {
            duration: 1,
            ease: "expo.in",
            opacity: 0,
            x: "-100%",
          },
          "experiences+=2.7"
        )
        .set(paymenowRef.current, { display: "none" })
        .to(
          musicaRef.current,
          {
            duration: 1,
            ease: "expo.in",
            opacity: 0,
            x: "100%",
          },
          "experiences+=2.8"
        )
        .set(musicaRef.current, { display: "none" })
        .to(
          titleContainerRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          },
          "experiences+=3.5"
        )
        .to(
          titleChangeRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            fontSize: titleSize,
            lineHeight: "15vh",
          },
          "experiences+=3.5"
        )
        .add("certification", ">")
        .to(
          titleChangeRef.current,
          {
            duration: 0.5,
            ease: "expo.inOut",
            top: "-200%",
          },
          "certification"
        )
        .to(
          titleContainerRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            top: "0",
            left: "0",
            x: "30",
            y: "0",
          },
          "certification+=1.5"
        )
        .to(
          titleChangeRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            fontSize: "5vh",
          },
          "certification+=1.5"
        )
        .fromTo(
          opquastRef.current,
          {
            rotateZ: "12deg",
            rotateY: "-38deg",
            rotateX: "28deg",
            x: "-50%",
            y: "-50%",
            z: -1000,
            opacity: 0,
          },
          {
            duration: 1,
            ease: "expo.Out",
            rotateZ: "0deg",
            rotateY: "0deg",
            rotateX: "0deg",
            x: "-50%",
            y: "-50%",
            z: 0,
            opacity: 1,
            // overwrite: true,
          },
          "certification+=1.5"
        )
        .to(
          opquastRef.current,
          {
            duration: 1,
            ease: "expo.in",
            rotateZ: "-12deg",
            rotateY: "38deg",
            rotateX: "28deg",
            x: "-50%",
            y: "-50%",
            z: -1000,
            opacity: 0,
            // overwrite: true,
          },
          "certification+=3"
        )
        .set(opquastRef.current, { display: "none" })
        .to(
          titleContainerRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          },
          "certification+=3.8"
        )
        .to(
          titleChangeRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            fontSize: titleSize,
            lineHeight: "15vh",
          },
          "certification+=3.8"
        )
        .add("temoignages", ">")
        .to(
          titleChangeRef.current,
          {
            duration: 0.5,
            ease: "expo.inOut",
            top: "-300%",
          },
          "temoignages"
        )
        .to(
          titleContainerRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            top: "0",
            left: "0",
            x: "30",
            y: "0",
          },
          "temoignages+=1.5"
        )
        .to(
          titleChangeRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            fontSize: "5vh",
          },
          "temoignages+=1.5"
        )
        .fromTo(
          temoignage1sectionRef.current,
          {
            opacity: 0,
            top: "100%",
          },
          {
            duration: 2,
            ease: "expo.Out",
            opacity: 1,
            top: "50%",
          },
          "temoignages+=1.5"
        )
        .fromTo(
          temoignage1Ref.current,
          {
            opacity: 0.5,
            clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0 50%)",
          },
          {
            duration: 2,
            delay: 0.1,
            opacity: 1,
            ease: "expo.out",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
          },
          "temoignages+=3"
        )
        .fromTo(
          temoignage1part1Ref.current,
          { top: "50%" },
          {
            ease: "expo.out",
            duration: 2,
            top: 0,
          },
          "<"
        )
        .fromTo(
          temoignage1part2Ref.current,
          { top: "50%" },
          {
            ease: "expo.out",
            duration: 2,
            top: "100%",
          },
          "<"
        )
        .to(
          temoignage1sectionRef.current,
          {
            duration: 2,
            ease: "expo.in",
            opacity: 0,
            top: "0%",
          },
          "temoignages+=3.5"
        )
        .set(temoignage1sectionRef.current, { display: "none" })
        .fromTo(
          temoignage2sectionRef.current,
          {
            opacity: 0,
            top: "100%",
          },
          {
            duration: 2,
            ease: "expo.Out",
            opacity: 1,
            top: "50%",
          },
          "temoignages+=5"
        )
        .fromTo(
          temoignage2Ref.current,
          {
            opacity: 0.5,
            clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0 50%)",
          },
          {
            duration: 2,
            delay: 0.1,
            opacity: 1,
            ease: "expo.out",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)",
          },
          "temoignages+=6.5"
        )
        .fromTo(
          temoignage2part1Ref.current,
          { top: "50%" },
          {
            ease: "expo.out",
            duration: 2,
            top: 0,
          },
          "<"
        )
        .fromTo(
          temoignage2part2Ref.current,
          { top: "50%" },
          {
            ease: "expo.out",
            duration: 2,
            top: "100%",
          },
          "<"
        )
        .to(
          temoignage2sectionRef.current,
          {
            duration: 2,
            ease: "expo.in",
            opacity: 0,
            top: "0%",
          },
          "temoignages+=7"
        )
        .set(temoignage2sectionRef.current, { display: "none" })
        .to(
          titleChangeRef.current,
          {
            duration: 1,
            ease: "expo.Out",
            top: "-400%",
          },
          ">"
        )
        .fromTo(
          backToProjectsRef.current,
          {
            opacity: 0,
            top: "100%",
          },
          {
            duration: 1,
            ease: "expo.Out",
            opacity: 1,
            top: "50%",
          },
          "<"
        )
        .fromTo(
          scrollIconRef.current,
          {
            opacity: 1,
          },
          {
            duration: 1,
            ease: "expo.in",
            opacity: 0,
            y: "100%",
          },
          "<"
        )
        .set(scrollIconRef.current, { display: "none" });

      tl.current.pause();
      tl.current.seek(0.1);
      // tl.current.progress(0.5);
    },
    { scope: containerRef }
  );

  const calculateScrollPercent = useCallback(() => {
    if (!scrollRef.current || !tl.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

    const timelinePercent = (scrollPercent / 100) * tl.current.duration();
    tl.current.progress(timelinePercent / tl.current.duration());
  }, []);
  const mouseMove = useCallback(
    (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      // console.log("mouse", x, y);

      refArrayTo3d.forEach((ref) => {
        if (!ref.current) return;
        gsap.to(ref.current, {
          duration: 0.1,
          rotateX: -y * 15,
          rotateY: x * 15,
          overwrite: "auto",
        });
      });
    },
    [refArrayTo3d]
  );
  useEffect(() => {
    document.title = "À propos d'Akira";
    if (!scrollRef.current) return;
    scrollRef.current.addEventListener("scroll", calculateScrollPercent);
    if (window.innerWidth < 900) {
      document.onreadystatechange = () => {
        mouseMove({
          clientX: window.innerWidth,
          clientY: window.innerHeight,
        } as MouseEvent);
      };
    } else {
      window.addEventListener("mousemove", (e) => mouseMove(e));
    }
    return () => {
      if (!scrollRef.current) return;
      scrollRef.current.removeEventListener("scroll", calculateScrollPercent);
      if (window.innerWidth < 900) {
        window.removeEventListener("mousemove", (e) => mouseMove(e));
      }
    };
  }, [mouseMove, calculateScrollPercent]);

  return (
    <div
      className="max-h-[100svh] overflow-y-scroll fixed inset-0 w-full bg-black"
      ref={scrollRef}
    >
      <div id="scroll" className="h-[2000vh] w-full"></div>
      <div
        className=" h-screen w-full fixed pointer-events-none top-0 left-0 [perspective:800px]"
        ref={containerRef}
      >
        <h2 className=" top-10 z-10 right-10 absolute text-xl sm:text-xxl font-primaryFont">
          AKIRA VALADE
        </h2>
        <p className=" bottom-10 z-10 left-10 absolute p-0 m-0  text-xl font-primaryFont">
          <Link to="/" className=" pointer-events-auto ">
            <svg
              className="h-[3vh] inline-block mr-2 scale-150"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M7 17L16.5 7.5M17 7H8M17 7V16"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                ></path>
              </g>
            </svg>
            {
              {
                fr: "Projets",
                en: "Projects",
                jp: "プロジェクト",
              }[language]
            }
          </Link>
        </p>
        <section className="absolute pointer-events-auto bottom-10 right-10 text-xl z-10 select-none cursor-pointer	">
          <div onClick={() => handleLanguageClick()}>
            {
              {
                fr: "🇫🇷",
                en: "🇬🇧",
                jp: "🇯🇵",
              }[language]
            }
          </div>
        </section>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-10 w-10 absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          xmlns="http://www.w3.org/2000/svg"
          ref={scrollIconRef}
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 6V14"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M15 11L12 14L9 11"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
        <p
          className=" top-2/3 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl z-0 text-center w-[90vw] sm:w-auto"
          ref={introductionTextRef}
        >
          {
            {
              fr: `Salut, je suis un développeur créatif passionné de web design, féru de
          code et de création 3D en autodidacte. À 20 ans rentre actuellement
          aux Gobelins pour un master expert en création numérique interactive.`,
              en: `Hi, I'm a creative developer passionate about web design, code and 3D creation as a self-taught. At 20 years old, currently entering the Gobelins for a master's degree in expert in interactive digital creation.`,
              jp: `こんにちは、私はウェブデザイン、コード、3D制作に情熱を持つクリエイティブな開発者です。20歳で、現在、インタラクティブデジタルクリエーションの専門家の修士号をゴベリンに入学しています。`,
            }[language]
          }
        </p>
        <div
          className="h-full w-full z-0 absolute bg-[url(https://akirav.art/akiravaladeillustration.png)] bg-center bg-no-repeat bg-cover"
          style={{
            clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0 50%)",
            boxShadow: "inset 0 0 0 100vmax rgba(0, 0, 0, .2)",
          }}
          ref={backgroundAiImageRef}
        ></div>
        <div
          className="h-full w-full absolute top-0 left-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, .15) .2vh, transparent .2vh), linear-gradient(90deg, rgba(255, 255, 255, .15) .2vh, transparent .2vh)",
            backgroundSize: "8vh 8vh",
            backgroundPosition: "2vh 2vh",
            backgroundRepeat: "repeat",
          }}
        ></div>
        <div
          className="top-1/2 left-1/2 h-[15vh] overflow-y-hidden absolute min-w-fit z-10"
          ref={titleContainerRef}
        >
          <h1
            className="relative text-white text-xxxl sm:text-xxxxl text-center top-0 font-primaryFont flex flex-col"
            ref={titleChangeRef}
          >
            <span className="break-keep">
              {
                {
                  fr: "À PROPOS",
                  en: "ABOUT",
                  jp: "プロフィール",
                }[language]
              }
            </span>
            <span className="break-keep">
              {
                {
                  fr: "EXPÉRIENCES",
                  en: "EXPERIENCES",
                  jp: "経験",
                }[language]
              }
            </span>
            <span className="break-keep">
              {
                {
                  fr: "CERTIFICATION",
                  en: "CERTIFICATION",
                  jp: "認定",
                }[language]
              }
            </span>
            <span className="break-keep">
              {
                {
                  fr: "TEMOIGNAGES",
                  en: "TESTIMONIALS",
                  jp: "証言",
                }[language]
              }
            </span>
          </h1>
        </div>
        <section
          className="w-[90vw] flex sm:gap-10 gap-6 flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          ref={expContainerRef}
        >
          <div
            ref={frenchflairRef}
            className="w-full px-4 py-2 h-max sm:h-[10vh] bg-white text-black flex justify-start sm:justify-center items-center gap-2 sm:gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:w-full sm:justify-center sm:items-center sm:gap-4 gap-1">
              <h2 className="min-w-max text-xxl sm:text-xxxl font-primaryFont text-[#299b85] pointer-events-auto">
                <a
                  href="https://frenchflair.pro"
                  target="_blank"
                  rel="noreferrer"
                  className=" pointer-events-auto"
                >
                  FRENCHFLAIR
                </a>
              </h2>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
              <p className=" min-w-max text-xl">
                {
                  {
                    fr: (
                      <>
                        Management et création des
                        <br />
                        sites et experiences digitales
                      </>
                    ),
                    en: (
                      <>
                        Management and creation of <br />
                        websites and digital experiences
                      </>
                    ),
                    jp: (
                      <>
                        サイトとデジタル体験の
                        <br />
                        管理と作成
                      </>
                    ),
                  }[language]
                }
              </p>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
              <p className="min-w-max px-4 py-2 text-xl text-center rounded-full border border-solid border-black">
                {
                  {
                    fr: "Alternance de 8 mois",
                    en: "8 months alternation",
                    jp: "8か月の交代",
                  }[language]
                }
              </p>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
            </div>
            <a
              href="https://frenchflair.pro"
              className=" pointer-events-auto sm:min-w-max h-full"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/frenchflair.png" alt="" className="h-full" />
            </a>
          </div>

          <div
            ref={paymenowRef}
            className="w-full px-4 py-2 h-max sm:h-[10vh] bg-white text-black flex justify-start sm:justify-center items-center gap-2 sm:gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:w-full sm:justify-center sm:items-center sm:gap-4 gap-1">
              <h2 className=" min-w-max text-xxl sm:text-xxxl font-primaryFont pointer-events-auto text-black m-0 p-0">
                <a
                  href="https://paymenowdigital.com/"
                  className=" pointer-events-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  PAY ME NOW
                </a>
              </h2>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
              <p className=" min-w-max text-xl">
                {
                  {
                    fr: (
                      <>
                        Refonte Ui et front end, <br />
                        création du nouveau site web
                      </>
                    ),
                    en: (
                      <>
                        Ui and front end redesign, <br />
                        creation of the new website
                      </>
                    ),
                    jp: (
                      <>
                        Uiとフロントエンドのリデザイン、
                        <br />
                        新しいウェブサイトの作成
                      </>
                    ),
                  }[language]
                }
              </p>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
              <p className="min-w-max px-4 py-2 text-xl text-center rounded-full border border-solid border-black">
                {
                  {
                    fr: "Stage de 2 mois",
                    en: "2 months internship",
                    jp: "2か月のインターンシップ",
                  }[language]
                }
              </p>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
            </div>
            <a
              href="https://paymenowdigital.com/"
              className=" pointer-events-auto sm:min-w-max sm:h-full"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/paymenow.jpg" alt="" className="sm:h-full" />
            </a>
          </div>
          <div
            ref={musicaRef}
            className="w-full px-4 py-2 sm:h-[10vh] bg-white text-black flex justify-center items-center gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:w-full sm:justify-center sm:items-center sm:gap-4 gap-1">
              <h2 className="min-w-max text-xxl sm:text-xxxl font-primaryFont pointer-events-auto text-[#e63165]">
                <a
                  href="https://www.asiaworldmusic.fr/"
                  className=" pointer-events-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  MUSICA
                </a>
              </h2>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
              <p className=" min-w-max text-xl">
                {
                  {
                    fr: (
                      <>
                        Mise en place du nouveau <br />
                        site web de e-commerce
                      </>
                    ),
                    en: (
                      <>
                        Setting up the new <br />
                        e-commerce website
                      </>
                    ),
                    jp: <>新しいeコマースサイトの設定</>,
                  }[language]
                }
              </p>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
              <p className="min-w-max px-4 py-2 text-xl text-center rounded-full border border-solid border-black">
                {
                  {
                    fr: "CDD de 2 mois",
                    en: "2 months CDD",
                    jp: "2か月のCDD",
                  }[language]
                }
              </p>
              <div className="w-full h-[1px] bg-black hidden sm:block"></div>
            </div>
            <a
              href="https://www.asiaworldmusic.fr/"
              className=" pointer-events-auto sm:min-w-max sm:h-full"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/musica.jpg" alt="" className="h-full" />
            </a>
          </div>
        </section>
        <section
          className="w-[85vw] sm:w-[80vw] flex sm:flex-row flex-col sm:h-[45vh] top-1/2 left-1/2 absolute"
          ref={opquastRef}
        >
          <div
            className="sm:h-[45vh] aspect-video sm:aspect-square bg-white p-10 sm:p-20 z-0 relative"
            style={{
              clipPath:
                "polygon(4vh 0,calc(100% - 4vh) 0,100% 4vh,100% calc(100% - 4vh),calc(100% - 4vh) 100%,4vh 100%,0 calc(100% - 4vh),0 4vh)",
            }}
          >
            <div
              className="h-full bg-[#03707d] w-full"
              style={{
                clipPath:
                  "polygon(1vh 0,calc(100% - 1vh) 0,100% 1vh,100% calc(100% - 1vh),calc(100% - 1vh) 100%,1vh 100%,0 calc(100% - 1vh),0 1vh)",
              }}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vh] bg-black overflow-hidden border-2 border-solid border-black rounded-xl scale-[0.65] sm:scale-100">
              <img
                src="https://akirav.art/opquast-logo.svg"
                className="w-full p-0 m-0"
                alt=""
              />
            </div>
          </div>
          <div className="sm:w-0 flex justify-center items-center w-full h-0 sm:h-full overflow-visible z-10 relative">
            <div
              className="sm:min-w-1 min-h-1 sm:h-[80%] w-[80%] z-10"
              style={
                window.innerWidth > 900
                  ? {
                      background:
                        "linear-gradient(0deg, #000, #000 5%, transparent 5%, transparent 10%, #000 10%, #000 15%, transparent 15%, transparent 20%, #000 20%, #000 25%, transparent 25%, transparent 30%, #000 30%, #000 35%, transparent 35%, transparent 40%, #000 40%, #000 45%, transparent 45%, transparent 50%, #000 50%, #000 55%, transparent 55%, transparent 60%, #000 60%, #000 65%, transparent 65%, transparent 70%, #000 70%, #000 75%, transparent 75%, transparent 80%, #000 80%, #000 85%, transparent 85%, transparent 90%, #000 90%, #000 95%, transparent 95%, transparent 100%, #000 100%)",
                    }
                  : {
                      background:
                        "linear-gradient(90deg, #000, #000 5%, transparent 5%, transparent 10%, #000 10%, #000 15%, transparent 15%, transparent 20%, #000 20%, #000 25%, transparent 25%, transparent 30%, #000 30%, #000 35%, transparent 35%, transparent 40%, #000 40%, #000 45%, transparent 45%, transparent 50%, #000 50%, #000 55%, transparent 55%, transparent 60%, #000 60%, #000 65%, transparent 65%, transparent 70%, #000 70%, #000 75%, transparent 75%, transparent 80%, #000 80%, #000 85%, transparent 85%, transparent 90%, #000 90%, #000 95%, transparent 95%, transparent 100%, #000 100%)",
                    }
              }
            ></div>
          </div>
          <div
            className=" h-full bg-white py-10 sm:py-5 flex flex-col gap-1 sm:gap-5 relative z-0"
            style={{
              clipPath:
                "polygon(4vh 0,calc(100% - 4vh) 0,100% 4vh,100% calc(100% - 4vh),calc(100% - 4vh) 100%,4vh 100%,0 calc(100% - 4vh),0 4vh)",
            }}
          >
            <div className=" px-5 sm:px-10 flex gap-5 justify-center items-center">
              <h1 className="text-xxxl font-primaryFont text-black">OPQUAST</h1>
              <div className="h-[1px] bg-black w-full hidden sm:block"></div>
              <div className="h-[5vh] w-[5vh] min-h-[5vh] min-w-[5vh] relative">
                <div className=" left-1/2 h-full bg-black absolute w-[1px]"></div>
                <div className=" top-1/2 bg-black h-[1px] absolute w-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-1/2 border border-black border-solid rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-black rounded-full"></div>
              </div>
            </div>
            <ul className="flex flex-col sm:flex-row gap-2 text-xl text-black px-5 sm:px-10">
              <li className=" font-light px-4 py-2 border border-solid border-black">
                07/04/2023
              </li>
              <li className=" font-light px-4 py-2 border border-solid border-black">
                MQW-V4-2020
              </li>
              <li className=" font-light px-4 py-2 border pointer-events-auto border-solid border-black">
                <a href="https://directory.opquast.com/fr/certificat/05YAMH/">
                  <span>
                    {
                      {
                        fr: "Code",
                        en: "Code",
                        jp: "コード",
                      }[language]
                    }
                  </span>
                  <span>: 05YAMH</span>
                  <img
                    src="./openInNewTab.svg"
                    alt="open in new tab"
                    className=" w-[2vh] h-[2vh] inline-block ml-2"
                  />
                </a>
              </li>
            </ul>
            <div className=" px-5 sm:px-10 flex h-full items-center">
              <p className="text-xl text-black">
                {
                  {
                    fr: (
                      <>
                        Opquast est une certification de qualité web. Elle
                        permet de garantir la qualité des sites web en matière
                        de respect des standards du web, de l'accessibilité, de
                        la sécurité et de la compatibilité.
                      </>
                    ),
                    en: (
                      <>
                        Opquast is a web quality certification. It ensures the
                        quality of websites in terms of compliance with web
                        standards, accessibility, security and compatibility.
                      </>
                    ),
                    jp: (
                      <>
                        OpquastはWeb品質認証です。
                        Web標準、アクセシビリティ、セキュリティ、互換性の観点からWebサイトの品質を保証します。
                      </>
                    ),
                  }[language]
                }
              </p>
            </div>
            <div className="h-max py-1 leading-6 overflow-hidden hidden sm:flex justify-center bg-[#03707d] text-white text-center items-center">
              <div className="text-l flex justify-between w-full">
                {
                  {
                    fr: (
                      <>
                        <div>CERTIFICATION</div>
                        <div>CERTIFICATION</div>
                        <div>CERTIFICATION</div>
                        <div>CERTIFICATION</div>
                      </>
                    ),
                    en: (
                      <>
                        <div>CERTIFICATION</div>
                        <div>CERTIFICATION</div>
                        <div>CERTIFICATION</div>
                        <div>CERTIFICATION</div>
                      </>
                    ),
                    jp: (
                      <>
                        <div>認定</div>
                        <div>認定</div>
                        <div>認定</div>
                        <div>認定</div>
                      </>
                    ),
                  }[language]
                }
              </div>
            </div>
          </div>
        </section>
        <section className="absolute w-full h-full [perspective:800px]">
          <div
            className=" top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-auto"
            ref={temoignage1sectionRef}
          >
            <img
              src="/guillemets.svg"
              className=" absolute top-0 left-0 h-8 w-8 text-white -translate-x-full -translate-y-full"
              alt=""
              ref={temoignage1part1Ref}
            />
            <img
              src="/guillemets.svg"
              className="absolute top-full left-full h-8 w-8 text-white translate-x-0 translate-y-0"
              alt=""
              ref={temoignage1part2Ref}
            />
            <div
              className="container w-full items-center justify-center gap-10 align-middle text-center relative"
              ref={temoignage1Ref}
            >
              <p className="text-xl">
                {
                  {
                    fr: (
                      <>
                        Akira a des facilités dans le domaine du numérique. Il
                        est volontaire et partage consciencieusement ses
                        connaissances avec beaucoup de zèle et de détails
                        techniques. Il est ouvert aux nouvelles technologies et
                        maitrise une palette de logiciels très variée.
                        <br />
                        Sa passion pour l'apprentissage et sa disposition à
                        aider les autres en font un collaborateur inestimable.
                      </>
                    ),
                    en: (
                      <>
                        Akira has facilities in the digital field. He is
                        voluntary and conscientiously shares his knowledge with
                        a lot of zeal and technical details. He is open to new
                        technologies and masters a very varied range of
                        software.
                        <br />
                        His passion for learning and his willingness to help
                        others make him an invaluable collaborator.
                      </>
                    ),
                    jp: (
                      <>
                        アキラはデジタル分野での施設を持っています。
                        彼は熱意と技術的な詳細を持って知識を共有し、自発的です。
                        彼は新しいテクノロジに開かれており、非常に多様なソフトウェアをマスターしています。
                        <br />
                        学習への情熱と他人を助ける意欲は、彼を貴重な協力者にします。
                      </>
                    ),
                  }[language]
                }
              </p>
              <span className="mb-6 mt-8 inline-block h-1 w-10 rounded bg-white opacity-50"></span>
              <h2 className=" font-primaryFont text-xxl tracking-wider text-white">
                YOUNÈS GASMILI
              </h2>
              <p className="text-white opacity-50 text-xl">
                {
                  {
                    fr: "Facilitateur_Fabmanager FacLab®",
                    en: "Facilitator_Fabmanager FacLab®",
                    jp: "ファシリテーター_Fabmanager FacLab®",
                  }[language]
                }
              </p>
            </div>
          </div>
          <div
            className=" top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2 w-[80vw] sm:w-auto"
            ref={temoignage2sectionRef}
          >
            <img
              src="/guillemets.svg"
              className=" absolute top-0 left-0 h-8 w-8 text-white -translate-x-full -translate-y-full"
              alt=""
              ref={temoignage2part1Ref}
            />
            <img
              src="/guillemets.svg"
              className="absolute top-full left-full h-8 w-8 text-white translate-x-0 translate-y-0"
              alt=""
              ref={temoignage2part2Ref}
            />
            <div
              className="container w-full items-center justify-center gap-10 align-middle text-center relative"
              ref={temoignage2Ref}
            >
              <p className="text-xl">
                {
                  {
                    fr: (
                      <>
                        Que dire d'Akira ? C'est une personne qui n'hésite pas à
                        aider les autres et à partager ses connaissances. Akira
                        cherche toujours à apprendre de nouvelles choses,
                        quelque soit le domaine, il s'y intéresse sincèrement.
                        On peut dire que c'est une vraie mine de connaissances.
                        Je vous conseille vivement de travailler avec lui 👀
                      </>
                    ),
                    en: (
                      <>
                        What can we say about Akira? He is someone who does not
                        hesitate to help others and share his knowledge. Akira
                        is always looking to learn new things, no matter what
                        the field, he is genuinely interested in it. We can say
                        that he is a real mine of knowledge. I highly recommend
                        working with him 👀
                      </>
                    ),
                    jp: (
                      <>
                        アキラについて何を言えばよいでしょうか？彼は他人を助け、知識を共有することをためらいません。
                        アキラは常に新しいことを学ぼうとしており、分野に関係なく、それに真剣に興味を持っています。
                        私たちは彼が本当の知識の宝庫であると言えます。
                        彼と一緒に働くことを強くお勧めします 👀
                      </>
                    ),
                  }[language]
                }
              </p>
              <span className="mb-6 mt-8 inline-block h-1 w-10 rounded bg-white opacity-50"></span>
              <h2 className=" font-primaryFont text-xxl tracking-wider text-white">
                MANY CLARA
              </h2>
              <p className="text-white opacity-50 text-xl">
                {
                  {
                    fr: "UX/UI Designer",
                    en: "UX/UI Designer",
                    jp: "UX/UIデザイナー",
                  }[language]
                }
              </p>
            </div>
          </div>
        </section>
        <section
          className="w-full h-max top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2"
          ref={backToProjectsRef}
        >
          <h2 className="text-white text-center text-6xl font-medium font-secondaryFont">
            <Link to="/" className=" pointer-events-auto ">
              <svg
                className="h-[13vh] inline-block"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M7 17L16.5 7.5M17 7H8M17 7V16"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  ></path>
                </g>
              </svg>
              {
                {
                  fr: "Retourner aux projets",
                  en: "Back to projects",
                  jp: "プロジェクトに戻る",
                }[language]
              }
            </Link>
          </h2>
        </section>
      </div>
    </div>
  );
};

export default About;

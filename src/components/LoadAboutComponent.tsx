import { useNavigationType } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ColorsRender } from './changeColors'
import { Link } from 'react-router-dom'

function LoadAbout({ anim }: { anim: Function }) {
  const navigationType: string | null = useNavigationType()

  const aboutRef = useRef<HTMLDivElement>(null)
  const percentScrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const { current } = aboutRef

    if (current && percentScrollRef.current) {
      const scrollTop = current.scrollTop
      const scrollHeight = current.scrollHeight
      const clientHeight = current.clientHeight
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 90
      percentScrollRef.current.style.top = `${scrollPercentage}%`
    }
  }
  const scrollTo = (element: HTMLElement | null) => {
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const card = document.getElementById('cardParent')
    const cardChild = document.getElementById('card')
    const cardChildEffect = document.getElementById('cardEffect')
    if (!card || !cardChild || !cardChildEffect) return
    cardChild.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1.3)'
    card.addEventListener('mousemove', function (e) {
      var offset = this.getBoundingClientRect()
      var relX = e.pageX - offset.left
      var relY = e.pageY - offset.top
      var offsetMinX = this.offsetWidth
      var offsetMinY = this.offsetHeight
      var currentX = (relX += offsetMinX * -0.5)
      var currentY = (relY += offsetMinY * -0.5)
      var newX = currentX / 1000000
      var newY = currentY / 2000000

      //get the id of card to select an other element with the same id
      cardChild.style.transform =
        'matrix3d(1,0,0,' +
        newX * 2 +
        ',0,1,0,' +
        newY * 2 +
        ',0,0,1,0,0,0,0,1.2)'
      cardChildEffect.style.backgroundPositionX = `${(currentX + 100) / 2}%`
    })
    card.addEventListener('mouseleave', function () {
      cardChild.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1.3)'

      cardChildEffect.style.backgroundPositionX = '120%'
    })
    const { current } = aboutRef
    const clickAboutTitle = document.getElementById('click-about-title')
    const clickCertificationTitle = document.getElementById(
      'click-certification-title'
    )
    const clickTestimonyTitle = document.getElementById('click-testimony-title')
    if (
      current &&
      clickAboutTitle &&
      clickCertificationTitle &&
      clickTestimonyTitle
    ) {
      current.addEventListener('scroll', handleScroll)
      clickAboutTitle.addEventListener('click', () => {
        scrollTo(document.getElementById('about-title'))
      })
      clickCertificationTitle.addEventListener('click', () => {
        scrollTo(document.getElementById('certification-title'))
      })
      clickTestimonyTitle.addEventListener('click', () => {
        scrollTo(document.getElementById('testimony-title'))
      })
      return () => {
        current.removeEventListener('scroll', handleScroll)
      }
    }
  })

  useEffect(() => {
    if (navigationType === 'POP') {
      anim()
      ColorsRender('#fff', '#111', 0.1)
    }
  })
  useEffect(() => {
    if (navigationType !== 'POP') {
      anim()
      ColorsRender('#fff', '#111', 0.1)
    }
  }, [document.getElementById('about')])
  return (
    <>
      <div
        id="aboutProgressScrollBar"
        className=" fixed left-5 top-1/2 z-50 hidden h-[60vh] w-[2px] -translate-y-1/2 bg-white bg-opacity-50 text-white sm:block"
      >
        <div
          ref={percentScrollRef}
          className=" absolute right-[2px] h-[10%] w-[1vh] bg-white opacity-50"
          id="currentScrollPositionAbout"
        ></div>
        <h3
          className="absolute left-4 top-0 m-0 min-w-max font-primaryFont text-xxl opacity-50 hover:opacity-100"
          id="click-about-title"
        >
          À propos
        </h3>
        <h3
          className="absolute left-4 top-[50%] m-0 min-w-max font-primaryFont text-xxl opacity-50 hover:opacity-100"
          id="click-certification-title"
        >
          Certification
        </h3>
        <h3
          className="absolute left-4 top-[75%] m-0 min-w-max font-primaryFont text-xxl opacity-50 hover:opacity-100"
          id="click-testimony-title"
        >
          Témoignage
        </h3>
      </div>
      <div
        id="about"
        ref={aboutRef}
        className=" cover absolute z-40 h-full w-full -translate-x-full overflow-y-scroll bg-[#111] text-white"
      >
        <div className="grid-image absolute h-[80vh] w-full">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: `
    url('akiravaladeillustration.png')`,
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          <h1 className=" text-primary relative m-0 w-max p-[2vh] font-primaryFont text-xxl uppercase sm:p-[4vh]">
            <Link to={'/'}>AKIRA VALADE</Link>
          </h1>
          <div className="text-primary decoration-none relative flex flex-col items-end font-secondaryFont text-xl uppercase underline visited:text-white sm:p-[4vh]">
            <Link className="group w-max" to="/">
              <svg
                className="mr-2 h-[1.5vh] w-[1.5vh] opacity-0 duration-150 group-hover:opacity-100"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 1 23 L 23 1"></path>
                <path d="M 6 1 h 17 v 17"></path>
              </svg>
              Projets
            </Link>
          </div>
        </div>
        <div className="relative px-2 text-xl sm:px-[16vw]">
          <h2 className="relative mb-[8vh] overflow-hidden font-primaryFont text-xxxxxl">
            <span className="relative inline-block" id="about-title">
              À propos
            </span>
          </h2>
          <section className="w-full px-[4vw] py-[3vw] text-[4vw] leading-[5vw]  sm:px-[3vw] sm:py-[2vw] sm:text-[3vw] md:text-[2vw] md:leading-[3vw]  lg:text-[1.5vw] lg:leading-[2vw]">
            <section>
              <p>
                Salut, je suis un développeur passionné de web design féru de
                code et de création 3D en autodidacte.
              </p>
              <br />
              <p>
                20 ans et actuellement en{' '}
                <b>
                  fin de de BUT{' '}
                  <a
                    className="underline"
                    href="https://iutmmi.fr/home/dut-mmi/dut-mmi-formation-pluridisciplinaire/"
                    target="_blank"
                  >
                    MMI
                  </a>
                </b>
                , mes dernières experiences en entreprise sont:
              </p>
              <br />
              <ul className="list-disc pl-[4vw]">
                <li>
                  Une alternance chez{' '}
                  <a className="underline" href="https://www.frenchflair.pro">
                    Frenchflair
                  </a>{' '}
                  où j'ai assuré le rôle de Webmaster
                </li>
                <br />
                <li>
                  Un stage chez{' '}
                  <a className="underline" href="https://paymenowdigital.com/">
                    PAY ME NOW
                  </a>{' '}
                  ou j'ai fais le redesign du site{' '}
                  <a
                    href="akiravalade.vercel.app/slapping"
                    className="underline"
                  >
                    Slapping
                  </a>{' '}
                  et créé le site du concours{' '}
                  <a
                    href=" akiravalade.vercel.app/africaproud"
                    className="underline"
                  >
                    African Proud
                  </a>{' '}
                  pour l'artiste{' '}
                  <a className="underline" href="https://www.djmohgreen.com/">
                    DJ Moh Green
                  </a>{' '}
                </li>
                <br />
                <li>
                  Un CDD à{' '}
                  <a
                    className="py-1 underline"
                    href="https://www.asiaworldmusic.fr/"
                  >
                    <b>Musica</b>
                  </a>{' '}
                  où j'ai{' '}
                  <a className="underline" href="https://kpopcafe.eu/">
                    créé un site web de e-commerce
                  </a>{' '}
                  de A à Z en équipe.{' '}
                </li>
              </ul>
              <br />
              <p>
                Ma passion pour la technologie et l'innovation me pousse à
                explorer les dernières avancées technologiques et à me tenir au
                courant des dernières tendances en matière de design.{' '}
              </p>
              <br />
              <p>
                Mes compétences en développement web évoluent constamment, je
                suis en cours d'aprentissage de threejs. Ce portfolio est en
                cours de création, restez à l'affut des changements!{' '}
              </p>
              <p>
                Je me considère comme créatif, persévérant et rigoureux dans mon
                travail et on dit souvent de moi que je suis ouvert d'esprit,
                sociable et intuitif.
              </p>
            </section>
            <ul className=" my-20  flex w-full list-none flex-row  flex-wrap justify-center gap-2 p-0 text-black sm:flex-nowrap">
              <li className="group relative aspect-square w-[30%] overflow-hidden rounded-full border-2 border-solid border-white bg-white sm:w-[20%]">
                <a
                  href="cv-11-05-2024_compressed.pdf"
                  id="CV"
                  className=" absolute h-full w-full"
                >
                  <div className="ease-inout absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 duration-500 group-hover:scale-125">
                    <svg
                      className="h-full w-full animate-bounce"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 192 150"
                      fill="none"
                    >
                      <path
                        d="M93.4425 102.122C89.772 107.891 86.2504 113.534 78.3592 119.017C74.1382 121.976 64.4228 127.757 50.613 127.757C24.2659 127.757 3 108.602 3 74.9254C3 45.4932 23.0044 22.2432 51.1748 22.2432C62.5875 22.2432 72.7275 26.1885 80.1949 32.1072C87.1001 37.6009 90.3341 43.0962 93.156 48.0282L73.4385 57.8805C72.0277 54.6458 70.3298 51.2622 65.9711 47.6033C61.1771 43.7952 56.3936 42.6713 52.2986 42.6713C36.2407 42.6713 27.7871 57.6057 27.7871 74.2257C27.7871 96.0649 38.9246 106.904 52.2986 106.904C65.2597 106.904 70.4786 97.8885 73.8514 92.1195L93.4425 102.122V102.122ZM162.515 25.3403H189L154.486 124.798H129.137L95.0483 25.3403H121.533L142.099 96.0653L162.515 25.3403Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
                </a>
              </li>
              <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-2  border-solid border-white bg-white sm:w-[20%]">
                <a
                  href="https://www.instagram.com/akkibi_/"
                  id="Instagram"
                  className=" absolute h-full w-full"
                >
                  <div className="ease-inout absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 duration-500 group-hover:scale-125">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 150 150"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_22_52)">
                        <path
                          d="M82.7104 0.00727484C88.1834 -0.0137268 93.6564 0.041279 99.1279 0.172275L100.583 0.224775C102.263 0.284775 103.92 0.359775 105.923 0.449775C113.903 0.824775 119.348 2.08478 124.125 3.93728C129.075 5.84228 133.245 8.42227 137.415 12.5923C141.228 16.3393 144.179 20.8719 146.063 25.8748C147.915 30.6523 149.175 36.1048 149.55 44.0848C149.64 46.0798 149.715 47.7448 149.775 49.4248L149.82 50.8798C149.954 56.3487 150.011 61.8192 149.993 67.2898L150 72.8848V82.7098C150.019 88.1828 149.961 93.6558 149.828 99.1273L149.783 100.582C149.723 102.262 149.648 103.92 149.558 105.922C149.183 113.902 147.908 119.347 146.063 124.125C144.185 129.133 141.234 133.669 137.415 137.415C133.665 141.227 129.13 144.178 124.125 146.062C119.348 147.915 113.903 149.175 105.923 149.55C103.92 149.64 102.263 149.715 100.583 149.775L99.1279 149.82C93.6565 149.953 88.1834 150.011 82.7104 149.992L77.1154 150H67.2979C61.8249 150.018 56.3519 149.961 50.8804 149.827L49.4254 149.782C47.645 149.718 45.865 149.643 44.0854 149.557C36.1054 149.182 30.6604 147.907 25.8754 146.062C20.8705 144.182 16.3372 141.231 12.5929 137.415C8.77576 133.667 5.8221 129.131 3.93792 124.125C2.08542 119.347 0.825421 113.902 0.450421 105.922C0.366893 104.143 0.291892 102.363 0.225421 100.582L0.187922 99.1273C0.0496489 93.6559 -0.0128579 88.1829 0.000421255 82.7098V67.2898C-0.020511 61.8193 0.0344949 56.3487 0.165422 50.8798L0.217922 49.4248C0.277922 47.7448 0.352921 46.0798 0.442921 44.0848C0.817921 36.0973 2.07792 30.6598 3.93042 25.8748C5.81572 20.8694 8.77515 16.3381 12.6004 12.5998C16.3421 8.78041 20.8726 5.82407 25.8754 3.93728C30.6604 2.08478 36.0979 0.824775 44.0854 0.449775L49.4254 0.224775L50.8804 0.187276C56.3493 0.0490722 61.8198 -0.0134345 67.2904 -0.000224616L82.7104 0.00727484ZM75.0004 37.5073C70.0317 37.437 65.0986 38.355 60.4877 40.2078C55.8769 42.0606 51.6803 44.8114 48.1418 48.3002C44.6032 51.789 41.7934 55.9463 39.8756 60.5305C37.9577 65.1147 36.9701 70.0343 36.9701 75.0035C36.9701 79.9727 37.9577 84.8924 39.8756 89.4766C41.7934 94.0607 44.6032 98.218 48.1418 101.707C51.6803 105.196 55.8769 107.946 60.4877 109.799C65.0986 111.652 70.0317 112.57 75.0004 112.5C84.946 112.5 94.4843 108.549 101.517 101.516C108.55 94.4837 112.5 84.9454 112.5 74.9998C112.5 65.0542 108.55 55.5159 101.517 48.4833C94.4843 41.4507 84.946 37.5073 75.0004 37.5073ZM75.0004 52.5073C77.9892 52.4522 80.959 52.9933 83.7364 54.0988C86.5137 55.2044 89.0429 56.8523 91.1763 58.9464C93.3096 61.0404 95.0042 63.5385 96.1612 66.2948C97.3183 69.0512 97.9144 72.0104 97.9149 74.9997C97.9154 77.989 97.3202 80.9485 96.1641 83.7052C95.0081 86.4619 93.3142 88.9606 91.1816 91.0553C89.049 93.15 86.5203 94.7988 83.7434 95.9053C80.9664 97.0118 77.9967 97.5538 75.0079 97.4998C69.0405 97.4998 63.3176 95.1292 59.098 90.9097C54.8784 86.6901 52.5079 80.9671 52.5079 74.9998C52.5079 69.0324 54.8784 63.3094 59.098 59.0899C63.3176 54.8703 69.0405 52.4998 75.0079 52.4998L75.0004 52.5073ZM114.375 26.2573C111.956 26.3541 109.668 27.3834 107.99 29.1296C106.312 30.8757 105.375 33.2033 105.375 35.6248C105.375 38.0463 106.312 40.3738 107.99 42.12C109.668 43.8661 111.956 44.8954 114.375 44.9923C116.862 44.9923 119.246 44.0046 121.005 42.2464C122.763 40.4882 123.75 38.1037 123.75 35.6173C123.75 33.1309 122.763 30.7463 121.005 28.9881C119.246 27.23 116.862 26.2423 114.375 26.2423V26.2573Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_22_52">
                          <rect width="150" height="150" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
                </a>
              </li>
              <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-2  border-solid border-white bg-white sm:w-[20%]">
                <a
                  href="https://github.com/Akkibi"
                  id="Github"
                  className=" absolute h-full w-full"
                >
                  <div className="scale ease-inout absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 duration-500 group-hover:scale-125">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 151 151"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_22_55)">
                        <path
                          d="M96.2772 15.1315C82.5254 11.936 68.224 11.936 54.4722 15.1315C46.5297 10.2602 40.466 8.02149 36.056 7.07649C34.1738 6.65169 32.2478 6.45154 30.3185 6.48024C29.4406 6.50403 28.5668 6.60949 27.7085 6.79524L27.596 6.81774L27.551 6.84024H27.5172L29.0585 12.2515L27.5172 6.85149C26.7269 7.07484 25.995 7.46856 25.3731 8.00497C24.7511 8.54139 24.2542 9.2075 23.9172 9.95649C20.5982 17.3894 19.9658 25.7449 22.1285 33.5927C16.5275 40.3805 13.4752 48.9125 13.4997 57.7127C13.4997 75.184 18.6522 86.929 27.4385 94.4777C33.5922 99.7652 41.0622 102.578 48.5547 104.186C47.3756 107.649 46.9312 111.32 47.2497 114.964V121.691C42.671 122.648 39.4985 122.344 37.2372 121.601C34.4135 120.668 32.2422 118.789 30.161 116.089C29.073 114.634 28.0592 113.124 27.1235 111.566L26.4822 110.52C25.6725 109.174 24.8323 107.846 23.9622 106.538C21.8247 103.376 18.6522 99.4165 13.5222 98.0665L8.07723 96.6377L5.21973 107.528L10.6647 108.956C11.5647 109.181 12.7347 110.025 14.6585 112.849C15.3989 113.964 16.1116 115.097 16.796 116.246L17.561 117.484C18.6185 119.194 19.8335 121.084 21.2397 122.929C24.086 126.641 27.9672 130.388 33.7272 132.289C37.6647 133.594 42.1422 133.909 47.2497 133.121V154.125C47.2497 155.617 47.8424 157.048 48.8973 158.103C49.9521 159.158 51.3829 159.75 52.8747 159.75H97.8747C99.3666 159.75 100.797 159.158 101.852 158.103C102.907 157.048 103.5 155.617 103.5 154.125V114.041C103.5 110.498 103.342 107.246 102.341 104.22C109.8 102.645 117.213 99.8327 123.333 94.5452C132.108 86.9402 137.25 75.0827 137.25 57.5102V57.499C137.221 48.7708 134.168 40.3223 128.61 33.5927C130.77 25.7484 130.137 17.3974 126.821 9.96774C126.486 9.21786 125.992 8.55031 125.372 8.01195C124.752 7.4736 124.022 7.07751 123.232 6.85149L121.691 12.2515C123.232 6.85149 123.221 6.85149 123.21 6.85149L123.187 6.84024L123.142 6.81774L123.041 6.79524C122.763 6.72299 122.481 6.66665 122.197 6.62649C121.608 6.54051 121.015 6.49166 120.42 6.48024C118.49 6.45176 116.564 6.6519 114.682 7.07649C110.283 8.02149 104.22 10.2602 96.2772 15.1315Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_22_55">
                          <rect width="151" height="151" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
                </a>
              </li>
              <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-2  border-solid border-white bg-white sm:w-[20%]">
                <a
                  href="mailto:akiravalade@gmail.com"
                  id="Mail"
                  className=" absolute h-full  w-full"
                >
                  <div className="absolute left-1/2 top-1/2 m-0  h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 duration-500 ease-in-out group-hover:scale-125">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 150 150"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M53.79 85.005L75.015 99.5175L95.475 85.4025L141.337 130.65C140.13 131.04 138.84 131.25 137.498 131.25H12.5025C10.8525 131.25 9.27751 130.927 7.83001 130.35L53.79 85.005ZM150 47.82V118.748C150 120.6 149.595 122.355 148.875 123.937L103.92 79.5825L150 47.82ZM7.07702e-06 48.2175L45.315 79.2075L0.795007 123.143C0.267725 121.737 -0.00159175 120.248 7.07702e-06 118.748V48.2175ZM137.498 18.75C144.398 18.75 150 24.345 150 31.2525V35.6475L74.985 87.36L7.07702e-06 36.075V31.2525C7.07702e-06 24.3525 5.59501 18.75 12.5025 18.75H137.498Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
                </a>
              </li>
              <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-2  border-solid border-white bg-white sm:w-[20%]">
                <a
                  href="https://www.linkedin.com/in/akira-valade-60956b200/"
                  id="Linkedin"
                  className=" absolute h-full w-full"
                >
                  <div className="ease-inout absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 duration-500 group-hover:scale-125">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 150 150"
                      fill="none"
                    >
                      <path
                        d="M37.0498 22.5002C37.0478 26.4784 35.4656 30.2929 32.6511 33.1046C29.8367 35.9162 26.0206 37.4947 22.0423 37.4927C18.0641 37.4907 14.2495 35.9084 11.4379 33.094C8.62626 30.2795 7.04782 26.4634 7.04981 22.4852C7.0518 18.5069 8.63406 14.6924 11.4485 11.8808C14.263 9.06913 18.0791 7.49069 22.0573 7.49268C26.0356 7.49467 29.8501 9.07693 32.6617 11.8914C35.4734 14.7058 37.0518 18.5219 37.0498 22.5002ZM37.4998 48.6002H7.49981V142.5H37.4998V48.6002ZM84.8998 48.6002H55.0498V142.5H84.5998V93.2252C84.5998 65.7752 120.375 63.2252 120.375 93.2252V142.5H150V83.0252C150 36.7502 97.0498 38.4752 84.5998 61.2002L84.8998 48.6002Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
                </a>
              </li>
            </ul>
          </section>
          <section className="w-full px-[4vw] sm:px-0" id="opquast-section">
            <div className="mb-10 flex flex-col sm:flex-row">
              <h2
                className="m-0 w-full self-center text-center font-primaryFont text-xxxl sm:mb-20 sm:text-left sm:text-xxxxl"
                id="certification-title"
              >
                Certification
              </h2>
              <div className="min-h-[20vh] w-full duration-75" id="cardParent">
                <div
                  className=" duration relative aspect-[12/9] scale-75 rounded-3xl bg-[url(https://res.cloudinary.com/opquast/image/upload/w_500/v2/badges/MQW-V4-2020/fr/PNG/badge_avance.png)] bg-contain bg-center bg-no-repeat duration-75"
                  id="card"
                >
                  <div
                    className="absolute h-full w-full rounded-3xl"
                    id="cardEffect"
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 text-[4vw] leading-[5vw] sm:flex-row sm:text-[3vw] md:text-[2vw] md:leading-[3vw] lg:text-[1.5vw] lg:leading-[2vw] ">
              <p className="m-0 w-full py-2">
                J'ai obtenu la certification Opquast en 2021, qui est une
                certification de qualité web. Elle permet de garantir la qualité
                des sites web en matière de respect des standards du web, de
                l'accessibilité, de la sécurité et de la compatibilité.
              </p>
              <ul className="m-0 mb-10 flex w-full list-none flex-col p-0">
                <li className="flex w-full justify-between py-2">
                  <p className="m-0 self-center font-bold">TYPE</p>
                  <p className="m-0 self-center">MQW-V4-2020</p>
                </li>
                <hr className="w-full border stroke-white text-white" />
                <li className=" flex w-full justify-between py-2">
                  <p className="m-0 self-center font-bold">DATE</p>
                  <p className="m-0 self-center">07/04/2023</p>
                </li>
                <hr className="w-full border stroke-white text-white" />
                <li className=" flex w-full justify-between py-2">
                  <p className="m-0 self-center font-bold">CODE</p>
                  <a
                    className="m-0 self-center underline"
                    href="https://directory.opquast.com/fr/certificat/05YAMH/"
                  >
                    05YAMH
                  </a>
                </li>
              </ul>
            </div>
          </section>
          <section className="body-font mb-[16vw] w-full px-[4vw] text-white sm:px-0">
            <div className="container mx-auto px-5 py-24">
              <div className="mx-auto w-full text-center">
                <h2
                  className="text-left font-primaryFont text-xxxxl"
                  id="testimony-title"
                >
                  Témoignage
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="mb-8 inline-block h-8 w-8 text-white"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="text-md text-[4vw] leading-relaxed sm:text-[3vw]  md:text-[2vw] md:leading-[3vw] lg:text-[1.5vw] lg:leading-[2vw] ">
                  Akira a des facilités dans le domaine du numérique. Il est
                  volontaire et partage consciencieusement ses connaissances
                  avec beaucoup de zèle et de détails techniques. Il est ouvert
                  aux nouvelles technologies et maitrise une palette de
                  logiciels très variée.
                  <br />
                  Sa passion pour l'apprentissage et sa disposition à aider les
                  autres en font un collaborateur inestimable.
                </p>
                <span className="mb-6 mt-8 inline-block h-1 w-10 rounded bg-white opacity-50"></span>
                <h2 className="title-font text-sm font-medium tracking-wider text-white">
                  YOUNÈS GASMILI
                </h2>
                <p className="text-white opacity-50">
                  Facilitateur_Fabmanager FacLab®
                </p>
              </div>
            </div>
          </section>
          <div className="flex justify-center">
            <div className="text-primary decoration-none relative flex flex-col items-end font-secondaryFont text-xl uppercase underline visited:text-white sm:p-[4vh]">
              <Link className="group w-max" to="/">
                <svg
                  className="mr-2 h-[1.5vh] w-[1.5vh] opacity-0 duration-150 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M 1 23 L 23 1"></path>
                  <path d="M 6 1 h 17 v 17"></path>
                </svg>
                Voir les projets
              </Link>
            </div>
          </div>
        </div>
        <footer className="body-font bg-black text-gray-400">
          <div className="container mx-auto flex flex-col items-center justify-between px-5 py-8 sm:flex-row">
            <p className="title-font flex items-center justify-center font-medium text-white md:justify-start">
              <img
                className="h-10 w-10 rounded-full text-white"
                src="favicon.ico"
                alt="icone du site"
              />
              <span className="ml-3 text-xl">Akira Valade</span>
              <span className="text-sm text-gray-400 sm:ml-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:pl-4">
                © 2023 —
                <a
                  href="mailto:akiravalade@gmail.com"
                  className="ml-1 text-gray-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  akiravalade@gmail.com
                </a>
              </span>
            </p>
            <a
              href="https://aristidebenoist.com/"
              className="text-sm text-gray-500"
            >
              Portfolio hautement inspiré de Aristide Benoist
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default LoadAbout

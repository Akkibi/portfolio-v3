import { FunctionComponent, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ColorsRender } from './changeColors'

interface NavbarProps {
  categorie: string
  setCategorie: (category: string) => void
}

const Navbar: FunctionComponent<NavbarProps> = ({
  categorie,
  setCategorie,
}) => {
  useEffect(() => {
    ColorsRender('#fff', '#111', 0.5)
  }, [categorie])

  return (
    <div className="absolute flex h-full w-full flex-row p-[2vh] transition-colors sm:p-[4vh]">
      <div className="flex w-[8vh] flex-col justify-between">
        <h1
          id="nav"
          className="text-primary relative m-0 w-max font-primaryFont text-xxl uppercase"
        >
          <Link to={'/'}>Akira Valade</Link>
        </h1>
        <p className="text-primary relative m-0 hidden w-max font-secondaryFont text-xl uppercase md:block">
          Développeur créatif front-end <br /> disponible à partir de septembre
        </p>
      </div>
      <div className="justify-betweens flex w-full flex-col justify-between">
        <div className="absolute bottom-[2vh] left-[2vh] inline-flex max-h-fit max-w-fit flex-col md:left-1/2 md:top-[4vh] md:-translate-x-1/2 md:flex-row md:gap-4">
          <NavLink
            to="/"
            onClick={() => {
              setCategorie('dev')
            }}
            id="dev"
            className={
              categorie === 'dev'
                ? ' bg-primary max-w-fit px-4 py-2 '
                : 'bg-secondary max-w-fit px-4 py-2 '
            }
          >
            <p
              className={
                categorie === 'dev'
                  ? 'text-secondary m-0 w-max max-w-fit uppercase'
                  : 'text-primary m-0 w-max max-w-fit uppercase'
              }
            >
              Developpeur
            </p>
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              setCategorie('2d')
            }}
            id="2d"
            className={
              categorie === '2d'
                ? 'bg-primary max-w-fit px-4 py-2'
                : 'bg-secondary max-w-fit px-4 py-2'
            }
          >
            <p
              className={
                categorie === '2d'
                  ? 'text-secondary m-0 w-max max-w-fit uppercase'
                  : 'text-primary m-0 w-max max-w-fit uppercase'
              }
            >
              Artiste 2D
            </p>
          </NavLink>
          <NavLink
            to="/"
            onClick={() => {
              setCategorie('3d')
            }}
            id="3d"
            className={
              categorie === '3d'
                ? 'bg-primary max-w-fit px-4 py-2'
                : 'bg-secondary max-w-fit px-4 py-2'
            }
          >
            <p
              className={
                categorie === '3d'
                  ? 'text-secondary m-0 w-max max-w-fit uppercase'
                  : 'text-primary m-0 w-max max-w-fit uppercase'
              }
            >
              Artiste 3D
            </p>
          </NavLink>
        </div>
        <div
          className=" absolute bottom-[2vh] left-1/2 -translate-x-1/2 sm:bottom-[4vh]"
          id="scrollIcon"
        >
          <p className="text-primary relative m-0 animate-bounce font-secondaryFont text-xxl uppercase underline">
            <svg
              className="mr-1 h-[4vh] w-[4vh]"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
            <svg
              className="mr-1 h-[4vh] w-[4vh]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 6V14"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M15 11L12 14L9 11"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </p>
        </div>
      </div>
      <div className="flex w-[8vh] flex-col justify-between">
        <div className="text-primary decoration-none flex flex-col items-end font-secondaryFont text-xl uppercase underline visited:text-white">
          <Link className="group w-max" to="/about">
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
            À propos
          </Link>
        </div>
        <div className=" text-primary decoration-none flex flex-col items-end font-secondaryFont text-xl uppercase underline visited:text-white ">
          <a href="cv-11-05-2024_compressed.pdf" className="group w-max">
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
            CV
          </a>
          <a href="https://www.instagram.com/akkibi_/" className="group w-max">
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
            Instagram
          </a>
          <a
            target="_top"
            href="mailto:akiravalade@gmail.com subject=Hello%20Akira"
            className="group w-max"
          >
            <svg
              className="mr-2 h-[1.5vh] w-[1.5vh] opacity-0  duration-150 group-hover:opacity-100"
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
            Email
          </a>
          <a href="https://github.com/Akkibi" className="group w-max">
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
            Github
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar

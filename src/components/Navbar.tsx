import { FunctionComponent, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ColorsRender } from '../animations/ColorAnimations'
import Button from './Button'
import EyeSvg from './EyeSvg'
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
          <Link to="/">Akira Valade</Link>
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
                ? ' bg-primary h-fit max-w-fit px-4 py-2'
                : 'bg-secondary h-fit max-w-fit px-4 py-2'
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
                ? 'bg-primary h-fit max-w-fit px-4 py-2'
                : 'bg-secondary h-fit max-w-fit px-4 py-2'
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
                ? 'bg-primary h-fit max-w-fit px-4 py-2'
                : 'bg-secondary h-fit max-w-fit px-4 py-2'
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
          className=" text-primary absolute bottom-[2vh] left-1/2 -translate-x-1/2 sm:bottom-[4vh]"
          id="scrollIcon"
        >
          <p>
            <EyeSvg moving={true} />
          </p>
        </div>
      </div>
      <div className="flex w-[8vh] flex-col justify-between">
        <div className="right-0 flex items-end self-end">
          <Button
            path="https://about-akira-valade.vercel.app/"
            innerSite={false}
          >
            À propos
          </Button>
        </div>
        <div className=" text-primary decoration-none flex flex-col items-end font-secondaryFont text-xl uppercase underline visited:text-white ">
          <Button path="akira-valade-cv-28-07-2024.pdf" innerSite={false}>
            CV
          </Button>
          <Button path="https://www.instagram.com/akkibi_/" innerSite={false}>
            Instagram
          </Button>
          <Button
            path="mailto:akiravalade@gmail.com subject=Hello%20Akira"
            innerSite={false}
          >
            Email
          </Button>
          <Button path="https://github.com/Akkibi" innerSite={false}>
            Github
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar

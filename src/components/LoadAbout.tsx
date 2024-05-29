import { useNavigationType } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { ColorsRender } from '../animations/ColorAnimations'
import { Link } from 'react-router-dom'
import Button from './Button'

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
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 80
      percentScrollRef.current.style.top = `${scrollPercentage}%`
    }
  }
  const scrollTo = (element: HTMLElement | null) => {
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth' })
  }

  const cardRef = useRef<HTMLDivElement>(null)
  const cardChildRef = useRef<HTMLDivElement>(null)
  const cardChildEffectRef = useRef<HTMLDivElement>(null)
  const clickAboutTitleRef = useRef<HTMLHeadingElement>(null)
  const clickCertificationTitleRef = useRef<HTMLHeadingElement>(null)
  const clickTestimonyTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const cardChild = cardChildRef.current
    const cardChildEffect = cardChildEffectRef.current
    const clickAboutTitle = clickAboutTitleRef.current
    const clickCertificationTitle = clickCertificationTitleRef.current
    const clickTestimonyTitle = clickTestimonyTitleRef.current
    const { current } = aboutRef
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
    }
    if (current && card && cardChild && cardChildEffect) {
      cardChild.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1.3)'
      const handleMouseMove = (e: MouseEvent) => {
        const offset = card.getBoundingClientRect()
        const relX = e.pageX - offset.left
        const relY = e.pageY - offset.top
        const offsetMinX = card.offsetWidth
        const offsetMinY = card.offsetHeight
        const currentX = relX + offsetMinX * -0.5
        const currentY = relY + offsetMinY * -0.5
        const newX = currentX / 1000000
        const newY = currentY / 2000000

        cardChild.style.transform = `matrix3d(1,0,0,${newX * 2},0,1,0,${newY * 2},0,0,1,0,0,0,0,1.2)`
        cardChildEffect.style.backgroundPositionX = `${(currentX + 100) / 2}%`
      }

      const handleMouseLeave = () => {
        cardChild.style.transform =
          'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1.3)'
        cardChildEffect.style.backgroundPositionX = '120%'
      }
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
      return () => {
        current.removeEventListener('scroll', handleScroll)
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

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
        className=" fixed left-5 top-1/2 z-50 hidden h-[60vh] w-[1.5px] -translate-y-1/2 bg-white bg-opacity-50 text-white md:block"
      >
        <div
          ref={percentScrollRef}
          className=" absolute right-[1.5px] h-[20%] w-[1vh] bg-white opacity-25"
          id="currentScrollPositionAbout"
        ></div>
        <h3
          className="absolute left-4 top-0 m-0 min-w-max font-primaryFont text-xl opacity-50 hover:opacity-100"
          id="click-about-title"
          ref={clickAboutTitleRef}
        >
          À propos
        </h3>
        <h3
          className="absolute left-4 top-[37%] m-0 min-w-max font-primaryFont text-xl opacity-50 hover:opacity-100"
          id="click-certification-title"
          ref={clickCertificationTitleRef}
        >
          Certification
        </h3>
        <h3
          className="absolute left-4 top-[57%] m-0 min-w-max font-primaryFont text-xl opacity-50 hover:opacity-100"
          id="click-testimony-title"
          ref={clickTestimonyTitleRef}
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
            <Link to="/">AKIRA VALADE</Link>
          </h1>
          <div className="p-[2vh] sm:p-[4vh]">
            <Button path="/" innerSite={true}>
              Projets
            </Button>
          </div>
        </div>
        <div className="relative px-2 text-xl sm:px-[16vw]">
          <h2 className="relative mb-[8vh] overflow-hidden font-primaryFont text-xxxxl">
            <span className="relative inline-block" id="about-title">
              À propos
            </span>
          </h2>
          <section className="w-full px-[4vw] pb-[10vh] text-[4vw] leading-[5vw] sm:px-[3vw] sm:text-[3vw] md:text-[2vw]  md:leading-[3vw] lg:text-[1.5vw] lg:leading-[2vw]">
            <p>
              Salut, je suis un développeur passionné de web design féru de code
              et de création 3D en autodidacte.
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
                <a href="akiravalade.vercel.app/slapping" className="underline">
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
              Mes compétences en développement web évoluent constamment, je suis
              en cours d'aprentissage de threejs. Ce portfolio est en cours de
              création, restez à l'affut des changements!{' '}
            </p>
            <p>
              Je me considère comme créatif, persévérant et rigoureux dans mon
              travail et on dit souvent de moi que je suis ouvert d'esprit,
              sociable et intuitif.
            </p>
          </section>
          <section
            className="w-full px-[4vw] pb-[10vh] sm:px-0"
            id="opquast-section"
          >
            <div className="mb-10 flex flex-col md:flex-row">
              <h2
                className="m-0 w-full self-center text-left font-primaryFont text-xxxl sm:mb-20 sm:text-xxxl"
                id="certification-title"
              >
                Certification
              </h2>
              <div
                className="min-h-[20vh] w-full duration-75 "
                id="cardParent"
                ref={cardRef}
              >
                <div
                  ref={cardChildRef}
                  className="duration relative aspect-[12/9] scale-75 rounded-3xl border-4 border-solid border-black bg-[url('/opquast-logo.svg')] bg-contain bg-center bg-no-repeat duration-75"
                  id="card"
                >
                  <div
                    ref={cardChildEffectRef}
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
            <h2
              className=" text-left font-primaryFont text-xxxl"
              id="testimony-title"
            >
              Témoignage
            </h2>
            <div className="container mx-auto w-full items-center justify-center gap-10 px-5 align-middle  md:flex">
              <div className="mx-auto w-full text-center">
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
              <div className="mx-auto w-full text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="mb-8 inline-block h-8 w-8 text-white"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="text-md text-[4vw] leading-relaxed sm:text-[3vw]  md:text-[2vw] md:leading-[3vw] lg:text-[1.5vw] lg:leading-[2vw] ">
                  Que dire d'Akira ? C'est une personne qui n'hésite pas à aider
                  les autres et à partager ses connaissances. Akira cherche
                  toujours à apprendre de nouvelles choses, quelque soit le
                  domaine, il s'y intéresse sincèrement. On peut dire que c'est
                  une vraie mine de connaissances. Je vous conseille vivement de
                  travailler avec lui 👀
                </p>
                <span className="mb-6 mt-8 inline-block h-1 w-10 rounded bg-white opacity-50"></span>
                <h2 className="title-font text-sm font-medium tracking-wider text-white">
                  MANY CLARA
                </h2>
                <p className="text-white opacity-50">UX/UI Designer</p>
              </div>
            </div>
          </section>
          <section className="mb-10 flex w-full justify-center py-10">
            <Button path="/" innerSite={true}>
              Retour aux projets
            </Button>
          </section>
          <ul className=" flex w-full list-none flex-row  flex-wrap justify-center gap-2 pb-10 text-black sm:flex-nowrap">
            <li className="group relative aspect-square w-[30%] overflow-hidden rounded-full border-[1.5px] border-solid border-white bg-white sm:w-[20%]">
              <a
                href="cv-11-05-2024_compressed.pdf"
                id="CV"
                className=" absolute h-full w-full"
              >
                <div className="ease-inout bg-fit absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 bg-[url(/cv.svg)] bg-no-repeat duration-500 group-hover:scale-125"></div>
                <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
              </a>
            </li>
            <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-[1.5px]  border-solid border-white bg-white sm:w-[20%]">
              <a
                href="https://www.instagram.com/akkibi_/"
                id="Instagram"
                className=" absolute h-full w-full"
              >
                <div className="ease-inout bg-fit absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 bg-[url(/instagram.svg)] bg-no-repeat duration-500 group-hover:scale-125"></div>
                <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
              </a>
            </li>
            <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-[1.5px]  border-solid border-white bg-white sm:w-[20%]">
              <a
                href="https://github.com/Akkibi"
                id="Github"
                className=" absolute h-full w-full"
              >
                <div className="scale ease-inout bg-fit absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 bg-[url(/github.svg)] bg-no-repeat duration-500 group-hover:scale-125"></div>
                <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
              </a>
            </li>
            <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-[1.5px]  border-solid border-white bg-white sm:w-[20%]">
              <a
                href="mailto:akiravalade@gmail.com"
                id="Mail"
                className=" absolute h-full  w-full"
              >
                <div className="ease-inout bg-fit absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 bg-[url(/mail.svg)] bg-no-repeat duration-500 group-hover:scale-125"></div>
                <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
              </a>
            </li>
            <li className="group relative aspect-square w-[30%]  overflow-hidden rounded-full border-[1.5px]  border-solid border-white bg-white sm:w-[20%]">
              <a
                href="https://www.linkedin.com/in/akira-valade-60956b200/"
                id="Linkedin"
                className=" absolute h-full w-full"
              >
                <div className="ease-inout bg-fit absolute left-1/2 top-1/2 m-0 h-[25%] w-[25%] -translate-x-1/2 -translate-y-1/2 bg-[url(/linkedin.svg)] bg-no-repeat duration-500 group-hover:scale-125"></div>
                <div className=" ease-inout absolute top-0 h-full w-full bg-white opacity-95 mix-blend-difference duration-500 group-hover:h-0"></div>
              </a>
            </li>
          </ul>
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

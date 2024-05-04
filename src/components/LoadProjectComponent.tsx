import { useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import { ProjectRender } from './ProjectRender'
import { gsap } from 'gsap'
import { ColorsRender } from './changeColors'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Project {
  name: string
  date: string
  title: string
  description: string
  images: string[]
  webpImages: string[]
  videos: string[]
  list: { [key: string]: string }
  link: string[]
  colors: string[]
}

function LoadProject({
  projectData,
  projectIndex,
  index,
  countData,
  projectList,
}: {
  projectData: Project
  projectIndex: number
  index: number
  countData: Array<number>
  projectList: Array<string>
}) {
  function alignImage(projectIndex: number, index: number, x: MediaQueryList) {
    let selectedWidth: number = window.innerWidth
    if (!x.matches) {
      selectedWidth = window.innerWidth * 0.85
    }
    const track = document.getElementById('slide-track')
    const image: HTMLElement | null = document.querySelector('.track-image')
    const title: HTMLElement | null = document.querySelector('.track-title')
    if (track !== null && image !== null && title !== null) {
      const offset =
        window.innerHeight * 0.15 * (projectIndex - 1) +
        title.getBoundingClientRect().width * index +
        (projectIndex + index - 1) * 16 +
        selectedWidth / 2

      const trackWidth =
        window.innerHeight * 0.15 * (countData[3] - 1) +
        title.getBoundingClientRect().width * 3 +
        (countData[3] + 3 - 1) * 16 +
        selectedWidth

      const offsetPercent = (offset / trackWidth) * -100
      gsap.to(track, {
        duration: 0.75,
        x: offsetPercent + '%',
        y: '-50%',
        ease: 'circ.out',
        overwrite: true,
      })
    }
  }
  const navigationType: string | null = useNavigationType()
  const project = projectData

  var x: MediaQueryList = window.matchMedia('(max-width: 768px)')

  useEffect(() => {
    if (navigationType === 'POP') {
      alignImage(projectIndex, index, x)
      ColorsRender(project.colors[0], project.colors[1], 1)
      ProjectRender(projectIndex, index, x)
    }
  }, [])

  if (navigationType !== 'POP') {
    alignImage(projectIndex, index, x)
    ColorsRender(project.colors[0], project.colors[1], 1)
    ProjectRender(projectIndex, index, x)
  }
  useEffect(() => {
    ColorsRender(project.colors[0], project.colors[1], 1)
  }, [document.getElementById('projectTitle')])

  const scrollableRef = useRef<HTMLDivElement>(null)
  const [isAtTop, setIsAtTop] = useState(true)

  if (scrollableRef.current) {
    if (isAtTop) {
      gsap.to(scrollableRef.current, {
        duration: 0.5,
        ease: 'power2',
        y: '150%',
        scale: 2,
        overwrite: 'auto',
      })
      gsap.to('#slide-track', {
        duration: 0.5,
        ease: 'power2',
        y: '-50%',
        overwrite: 'auto',
      })
      gsap.to('#titles', {
        duration: 0.5,
        ease: 'power2',
        y: 0,
        overwrite: 'auto',
      })
    }
    if (!isAtTop) {
      gsap.to(scrollableRef.current, {
        duration: 0.5,
        ease: 'power2',
        y: '0%',
        scale: 1,
        overwrite: 'auto',
      })
      gsap.to('#slide-track', {
        duration: 0.5,
        ease: 'power2',
        y: '-250%',
        overwrite: 'auto',
      })
      gsap.to('#titles', {
        duration: 0.5,
        ease: 'power2',
        y: window.innerHeight * -1.5,
        overwrite: 'auto',
      })
      scrollableRef.current.scrollTop = 20
    }
  }

  const handleWindowScroll = (e: WheelEvent) => {
    if (e.deltaY > 0 && isAtTop) {
      setIsAtTop(false)
    }
  }
  useEffect(() => {
    return () => {}
  }, [])
  const handleScroll = () => {
    if (scrollableRef.current) {
      setIsAtTop(scrollableRef.current.scrollTop <= 10)
    }
  }

  const handleWindowOnDown = (e: MouseEvent | TouchEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    if (scrollableRef.current) {
      scrollableRef.current.dataset.touchDownAtX = clientX.toString()
      scrollableRef.current.dataset.touchDownAtY = clientY.toString()
      // console.log(
      //   scrollableRef.current.dataset.touchDownAtX,
      //   scrollableRef.current.dataset.touchDownAtY
      // )
    }
  }
  const navigate = useNavigate()
  const handleWindowOnUp = (e: TouchEvent | MouseEvent) => {
    const clientX = 'touches' in e ? e.changedTouches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.changedTouches[0].clientY : e.clientY
    // console.log(clientX, clientY)
    if (
      !isAtTop ||
      !scrollableRef.current ||
      !scrollableRef.current.dataset.touchDownAtY ||
      !scrollableRef.current.dataset.touchDownAtX
    )
      return
    // navigate to the right
    if (
      Math.abs(
        clientY - parseFloat(scrollableRef.current.dataset.touchDownAtY)
      ) <
        Math.abs(
          clientX - parseFloat(scrollableRef.current.dataset.touchDownAtX)
        ) &&
      clientX < parseFloat(scrollableRef.current.dataset.touchDownAtX) &&
      projectIndex < projectList.length
    ) {
      navigate('/' + projectList[projectIndex])
      console.log('navigate to the right')
      return
    }
    // navigate to the left
    if (
      Math.abs(
        clientY - parseFloat(scrollableRef.current.dataset.touchDownAtY)
      ) <
        Math.abs(
          clientX - parseFloat(scrollableRef.current.dataset.touchDownAtX)
        ) &&
      clientX > parseFloat(scrollableRef.current.dataset.touchDownAtX) &&
      projectIndex > 1
    ) {
      navigate('/' + projectList[projectIndex - 2])
      return
    }
    // navigate to the top
    if (
      Math.abs(
        clientY - parseFloat(scrollableRef.current.dataset.touchDownAtY)
      ) >
        Math.abs(
          clientX - parseFloat(scrollableRef.current.dataset.touchDownAtX)
        ) &&
      clientY > parseFloat(scrollableRef.current.dataset.touchDownAtY) &&
      isAtTop
    ) {
      setIsAtTop(false)
      navigate('/')
      return
    }
    // navigate to the main menu
    if (
      Math.abs(
        clientY - parseFloat(scrollableRef.current.dataset.touchDownAtY)
      ) >
        Math.abs(
          clientX - parseFloat(scrollableRef.current.dataset.touchDownAtX)
        ) &&
      clientY < parseFloat(scrollableRef.current.dataset.touchDownAtY) &&
      isAtTop
    ) {
      setIsAtTop(false)
      return
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (!scrollableRef.current) return

    if (event.key === 'ArrowLeft' && isAtTop && projectIndex > 1) {
      navigate('/' + projectList[projectIndex - 2])
    }
    if (
      event.key === 'ArrowRight' &&
      isAtTop &&
      projectIndex < projectList.length
    ) {
      navigate('/' + projectList[projectIndex])
    }
    if (event.key === 'ArrowUp' && !isAtTop) {
      setIsAtTop(true)
      navigate('/' + projectList[projectIndex - 1])
    }
    if (event.key === 'ArrowUp' && isAtTop) {
      navigate('/')
    }
    if (
      (event.key === 'ArrowDown' && isAtTop) ||
      (event.key === 'Enter' && isAtTop)
    ) {
      setIsAtTop(false)
    }
  }
  useEffect(() => {
    if (scrollableRef.current) {
      window.addEventListener('keydown', handleKeyPress)
      scrollableRef.current.addEventListener('scroll', handleScroll)
      window.addEventListener('wheel', handleWindowScroll)
      window.addEventListener('mousedown', handleWindowOnDown)
      window.addEventListener('touchstart', handleWindowOnDown)
      window.addEventListener('mouseup', handleWindowOnUp)
      window.addEventListener('touchend', handleWindowOnUp)
      document.getElementById('scrollIcon')!.addEventListener('click', () => {
        setIsAtTop(false)
      })
      document
        .querySelectorAll('.unScrollIcon')[0]
        ?.addEventListener('click', () => {
          setIsAtTop(true)
        })
      document
        .querySelectorAll('.unScrollIcon')[1]
        ?.addEventListener('click', () => {
          setIsAtTop(true)
        })
    }

    // Cleanup event listener on component unmount
    return () => {
      if (scrollableRef.current) {
        window.removeEventListener('keydown', handleKeyPress)
        scrollableRef.current.removeEventListener('scroll', handleScroll)
        window.removeEventListener('wheel', handleWindowScroll)
        window.removeEventListener('touchstart', handleWindowOnDown)
        window.removeEventListener('touchend', handleWindowOnUp)
        document
          .getElementById('scrollIcon')!
          .removeEventListener('click', () => {
            setIsAtTop(false)
          })
        document
          .querySelectorAll('.unScrollIcon')[0]
          ?.removeEventListener('click', () => {
            setIsAtTop(true)
          })
        document
          .querySelectorAll('.unScrollIcon')[1]
          ?.removeEventListener('click', () => {
            setIsAtTop(true)
          })
      }
    }
  }, [navigate, isAtTop])

  return (
    <div
      ref={scrollableRef}
      className="transparent-secondary absolute left-1/2 z-50 h-full w-screen -translate-x-1/2 translate-y-full scale-100 overflow-y-scroll px-0 py-[7.5vh] md:px-[10vw]"
    >
      <div className="mb-[7.5vh] w-full">
        <div className="unScrollIcon mx-auto w-max">
          <p className="text-primary m-0 font-secondaryFont text-xxl uppercase underline">
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
              className="mr-1 h-[4vh] w-[4vh] rotate-180"
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
      <picture id={`image_${index}_${projectIndex}`}>
        <source
          srcSet={`/assets/${project.name}/${project.webpImages[0]}`}
          type="image/webp"
        />
        <img
          className="aspect-vidaeo max-h-[200vh] w-full bg-center object-contain"
          id={`image_${index}_${projectIndex}`}
          src={`/assets/${project.name}/${project.images[0]}`}
          alt={`${project.images[index]}`}
        />
      </picture>
      <div className="px-5 py-20 pb-32 md:px-0">
        <h1
          className="text-primary m-0  mb-10 font-primaryFont text-xxl sm:text-xxxl"
          id="projectTitle"
        >
          {project.title}
        </h1>
        <div className="text-primary flex flex-col gap-10 font-secondaryFont md:flex-row ">
          <div className=" w-full">
            <h2>DÉTAILS DU PROJET</h2>
            {/* <div className="flex place-content-between">
              <p>DATE</p>
              <p>{project.date}</p>
            </div>
            <hr className=" border-primary border-2" />
            <div className="flex place-content-between">
              <p>CLIENT</p>
            </div>
            <hr className=" border-primary border-2" />
            <div className="flex place-content-between">
              <p>SERVICE</p>
            </div> */}
            {/* list elements from data.list */}
            {project.list && (
              <>
                {Object.entries(project.list).map(([key, value], index) => (
                  <>
                    {index != 0 ? (
                      <hr className=" border-primary border-2" />
                    ) : (
                      ''
                    )}
                    <div key={key} className="flex place-content-between">
                      <p className="uppercase">{key}</p>
                      <p>{value}</p>
                    </div>
                  </>
                ))}
              </>
            )}

            {project.link && (
              <>
                <hr className=" border-primary border-2" />
                <div className="flex place-content-between">
                  <p>LIEN</p>
                  <a
                    href={project.link[0]}
                    className="text-primary group my-auto align-middle uppercase underline"
                  >
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
                    {project.link[1]}
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="w-full">
            <h2>DESCRIPTION</h2>
            <p className=" inline-block">{project.description}</p>
          </div>
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
        )
      })}
      <div className="my-2 grid grid-cols-2 gap-2">
        {project.images?.map((image, index) => {
          if (index > 0) {
            return (
              <div
                key={index}
                className="relative aspect-square w-full md:aspect-video"
              >
                <a
                  className=" absolute left-0 top-0 h-full w-full"
                  href={`/assets/${project.name}/${image}`}
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
                <picture id={`image_${index}_${projectIndex}`}>
                  <source
                    srcSet={`/assets/${project.name}/${project.webpImages[index]}`}
                    type="image/webp"
                  />
                  <img
                    className="object-fit absolute left-0 top-0 z-10 h-full w-full object-contain"
                    id={`image_${index}_${projectIndex}`}
                    src={`/assets/${project.name}/${project.images[index]}`}
                    alt={`${project.images[index]}`}
                  />
                </picture>
              </div>
            )
          }
        })}
      </div>
      <div className="mt-[7.5vh] w-full">
        <div className="unScrollIcon mx-auto w-max">
          <p className="text-primary m-0 font-secondaryFont text-xxl uppercase underline">
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
              className="mr-1 h-[4vh] w-[4vh] rotate-180"
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
    </div>
  )
}

export default LoadProject

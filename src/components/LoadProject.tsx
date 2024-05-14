import { useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import { ProjectRender } from '../animations/ProjectAnimations'
import { gsap } from 'gsap'
import { ColorsRender } from '../animations/ColorAnimations'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Project } from '../types'
import { countData } from '../main'
import React from 'react'
import Button from './button'

const alignImage = (projectIndex: number, index: number, x: MediaQueryList) => {
  const selectedWidth: number = !x.matches
    ? window.innerWidth * 0.85
    : window.innerWidth
  const track = document.getElementById('slide-track')
  const title: HTMLElement | null = document.querySelector('.track-title')
  if (track && title) {
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
      x: `${offsetPercent}%`,
      y: '-50%',
      ease: 'circ.out',
      overwrite: true,
    })
  }
}
function LoadProject({
  projectData: project,
  projectIndex,
  index,
  projectList,
}: {
  projectData: Project
  projectIndex: number
  index: number
  projectList: Array<string>
}) {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const [isAtTop, setIsAtTop] = useState(true)
  const navigate = useNavigate()
  const navigationType: string | null = useNavigationType()

  var x: MediaQueryList = window.matchMedia('(max-width: 768px)')

  useEffect(() => {
    if (navigationType === 'POP') {
      alignImage(projectIndex, index, x)
      ColorsRender(project.colors[0], project.colors[1], 1)
      ProjectRender(projectIndex, x)
    }
  }, [])

  if (navigationType !== 'POP') {
    alignImage(projectIndex, index, x)
    ColorsRender(project.colors[0], project.colors[1], 1)
    ProjectRender(projectIndex, x)
  }
  useEffect(() => {
    ColorsRender(project.colors[0], project.colors[1], 1)
  }, [document.getElementById('projectTitle')])

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
    } else {
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
    }
  }
  const handleWindowOnUp = (e: TouchEvent | MouseEvent) => {
    const clientX = 'touches' in e ? e.changedTouches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.changedTouches[0].clientY : e.clientY
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
      className="bg-secondary absolute left-1/2 z-50 h-full w-screen -translate-x-1/2 translate-y-full scale-100 overflow-y-scroll px-0 py-[7.5vh] md:px-[10vw]"
    >
      <div className="mb-[7.5vh] w-full">
        <div className="unScrollIcon mx-auto w-max">
          <p className="text-primary m-0 font-secondaryFont text-xxl uppercase underline">
            <svg
              className="mr-1 h-[4vh] w-[4vh]"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
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
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                ></path>
                <path
                  d="M12 6V14"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                ></path>
                <path
                  d="M15 11L12 14L9 11"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                ></path>
              </g>
            </svg>
          </p>
        </div>
      </div>
      <div className="relative w-full">
        <div className="bg-primary absolute inset-0 z-0 opacity-10"></div>
        <picture
          className=" relative z-20 max-h-[120vh] w-full bg-center object-contain"
          id={`image_${index}_${projectIndex}`}
        >
          <source
            srcSet={`/assets/${project.name}/${project.webpImages[0]}`}
            type="image/webp"
          />
          <img
            className="relative z-20 max-h-[120vh] w-full bg-center object-contain"
            id={`image_${index}_${projectIndex}`}
            src={`/assets/${project.name}/${project.images[0]}`}
            alt={`${project.images[index]}`}
          />
        </picture>
      </div>
      <div className="px-5 py-20 pb-32 md:px-0">
        <h2
          className="text-primary m-0  mb-10 font-primaryFont text-xxl sm:text-xxxl"
          id="projectTitle"
        >
          {project.title}
        </h2>
        <div className="text-primary flex flex-col gap-10 font-secondaryFont md:flex-row ">
          {project.list || project.link ? (
            <div className=" w-full">
              <h3 className="font-medium">DÉTAILS DU PROJET</h3>
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
                    <React.Fragment key={`${key}-${index}`}>
                      {index !== 0 && (
                        <hr
                          key={`${key}-${index}-hr`}
                          className="border-primary border border-solid"
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
                  ))}
                </>
              )}

              {project.link && (
                <>
                  <hr className=" border-primary border border-solid" />
                  <div className="flex place-content-between items-center">
                    <p>LIEN</p>
                    <Button path={project.link[0]} innerSite={false}>
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
            <h3 className=" font-medium">DESCRIPTION</h3>
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
      <div className=" m-2  grid grid-cols-2 gap-2 sm:mx-0">
        {project.images?.map((image, index) => {
          if (index > 0) {
            return (
              <div
                key={index}
                className="group relative aspect-square w-full md:aspect-video"
              >
                <a
                  className=" bg-primary absolute left-0 top-0 h-full w-full opacity-10"
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
                <svg
                  className="text-primary absolute bottom-5 left-5 z-20 h-[1.5vh] w-[1.5vh] opacity-0 duration-150 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M 6 1 h -5 v 21 h 21 v -5"></path>
                  <path d="M 6 18 L 22 1"></path>
                  <path d="M 10 1 h 12 v 12"></path>
                </svg>
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
              viewBox="0 0 24 24"
              fill="none"
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
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                ></path>
                <path d="M12 6V14" stroke="currentColor" strokeWidth="1"></path>
                <path
                  d="M15 11L12 14L9 11"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
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

import { useEffect, useRef } from 'react'
import projectData from '../data.json'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { Project } from '../types'

const ThumbnailsComponent = ({
  countData,
  projectList,
  categorie,
  setCategorie,
}: {
  countData: Array<number>
  projectList: Array<string>
  categorie: string
  setCategorie: (category: string) => void
}) => {
  //onclick&drag
  const scrollSpeed = 0.5
  const trackRef = useRef<HTMLDivElement>(null)

  const checkCurrentCategory = (percent: number) => {
    switch (true) {
      case percent <= categoryPercents.Artiste3D && categorie !== 'Artiste3D':
        setCategorie('3d')
        break
      case percent <= categoryPercents.Artiste2D && categorie !== 'Artiste2D':
        setCategorie('2d')
        break
      case percent <= categoryPercents.Developpeur &&
        categorie !== 'Developpeur':
        setCategorie('dev')
        break
      default:
        break
    }
  }

  function makeSliderAnimation(
    track: HTMLDivElement,
    nextValue: number,
    time: number
  ) {
    gsap.to('.thumbnail', {
      duration: time * 2,
      backgroundPosition: `${100 + nextValue}% center`,
      ease: 'expo.out',
      overwrite: true,
    })
    gsap.to(trackRef.current, {
      duration: time * 2,
      x: nextValue + '%',
      y: '-50%',
      ease: 'expo.out',
      overwrite: 'auto',
    })
    track.dataset.percentage = nextValue.toString()
    checkCurrentCategory(nextValue)
  }

  let categoryPercents: Record<string, number> = {
    Developpeur: 0,
    Artiste2D: 0,
    Artiste3D: 0,
  }

  const calculatePercentage = (quantity: number) => {
    if (!trackRef.current) {
      return 0
    }

    const title: HTMLElement | null = document.querySelector('.track-title')
    if (!title) {
      return 0
    }

    const titleWidth = title.getBoundingClientRect().width
    const trackWidth = trackRef.current.getBoundingClientRect().width
    const min = ((titleWidth + 16 + titleWidth / 2) / trackWidth) * -100
    const max = ((trackWidth - titleWidth / 2) / trackWidth) * -100
    return Math.max(Math.min(quantity, min), max)
  }

  const handleOnDown = (e: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    if (trackRef.current) {
      trackRef.current.dataset.mouseDownAt = clientX.toString()
    }
  }

  const handleOnUp = () => {
    if (
      trackRef.current &&
      window
        .getComputedStyle(trackRef.current)
        .transform.match(/matrix.*\((.+)\)/) !== null
    ) {
      trackRef.current.dataset.mouseDownAt = '0'
    }
  }

  const handleOnMove = (e: MouseEvent | TouchEvent) => {
    const title: HTMLElement | null = document.querySelector('.track-title')
    const image: HTMLElement | null = document.querySelector('.track-image')
    if (
      trackRef.current &&
      trackRef.current.dataset.mouseDownAt !== '0' &&
      trackRef.current.dataset.mouseDownAt !== undefined &&
      trackRef.current.dataset.percentage !== undefined &&
      window.location.pathname === '/' &&
      title &&
      image
    ) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const mouseDelta =
        parseFloat(trackRef.current.dataset.mouseDownAt) - clientX
      const percentage = (mouseDelta / window.innerWidth) * -3 * scrollSpeed

      const nextPercentageUnconstrained =
        parseFloat(trackRef.current.dataset.percentage) + percentage
      // next percentage needs to be number
      const nextPercentage: number = calculatePercentage(
        nextPercentageUnconstrained
      )

      trackRef.current.dataset.percentage = nextPercentage.toString()

      makeSliderAnimation(trackRef.current, nextPercentage, 0.4)
    }
  }

  const transformScroll = (e: WheelEvent) => {
    const title: HTMLElement | null = document.querySelector('.track-title')
    const image: HTMLElement | null = document.querySelector('.track-image')
    if (
      trackRef.current &&
      trackRef.current.dataset.percentage &&
      window.location.pathname === '/' &&
      title &&
      image
    ) {
      const delta = e.deltaX !== 0 ? -e.deltaX : e.deltaY
      const nextPercentageUnconstrained =
        parseFloat(trackRef.current.dataset.percentage) +
        (delta / 15) * scrollSpeed

      const nextPercentage: number = calculatePercentage(
        nextPercentageUnconstrained
      )
      makeSliderAnimation(trackRef.current, nextPercentage, 0.4)
    }
  }

  const transformArrow = (quantity: number) => {
    const title: HTMLElement | null = document.querySelector('.track-title')
    const image: HTMLElement | null = document.querySelector('.track-image')
    if (
      trackRef.current &&
      quantity &&
      trackRef.current.dataset.percentage &&
      window.location.pathname === '/' &&
      title &&
      image
    ) {
      const nextPercentageUnconstrained =
        parseFloat(trackRef.current.dataset.percentage) + quantity / 15

      const nextPercentage: number = calculatePercentage(
        nextPercentageUnconstrained
      )
      makeSliderAnimation(trackRef.current, nextPercentage, 0.4)
    }
  }

  const getCategoryPercents = () => {
    const title: HTMLElement | null = document.querySelector('.track-title')
    if (!trackRef.current || !title) {
      return
    }
    const titleWidth = title.getBoundingClientRect().width
    const space = 16
    const imageWidth = window.innerHeight * 0.15

    const trackWidth =
      imageWidth * countData[3] +
      titleWidth * 3 +
      (countData[3] + 3 - 1) * space
    const category1Percent = space + titleWidth
    categoryPercents.Developpeur =
      ((category1Percent + imageWidth / 2) / trackWidth) * -100
    const category2Percent =
      countData[0] * imageWidth +
      countData[0] * space +
      titleWidth * 2 +
      space * 2
    categoryPercents.Artiste2D =
      ((category2Percent + imageWidth / 2) / trackWidth) * -100
    const category3Percent =
      (countData[0] + countData[1]) * imageWidth +
      (countData[0] + countData[1]) * space +
      titleWidth * 3 +
      space * 3
    categoryPercents.Artiste3D =
      ((category3Percent + imageWidth / 2) / trackWidth) * -100
  }

  const alignCategory = (categoryName: string) => {
    if (!trackRef.current || !trackRef.current.dataset.percentage) {
      return
    }
    const time: number =
      Math.abs(
        parseFloat(trackRef.current.dataset.percentage) +
          Math.abs(categoryPercents[categoryName])
      ) /
        50 +
      0.5

    makeSliderAnimation(trackRef.current, categoryPercents[categoryName], time)

    trackRef.current.dataset.categorie = categoryName
    trackRef.current.dataset.percentage =
      categoryPercents[categoryName].toString()
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (trackRef.current) {
      if (event.key === 'ArrowLeft' && window.location.pathname === '/') {
        transformArrow(50)
      }
      if (event.key === 'ArrowRight' && window.location.pathname === '/') {
        transformArrow(-50)
      }
      if (event.key === 'ArrowUp' && window.location.pathname === '/') {
        alignCategory('Developpeur')
      }
      if (
        (event.key === 'ArrowDown' &&
          trackRef.current.dataset.percentage &&
          window.location.pathname === '/') ||
        (event.key === 'Enter' &&
          trackRef.current.dataset.percentage &&
          window.location.pathname === '/')
      ) {
        navigate(
          '/' +
            projectList[
              Math.round(
                Math.abs(
                  (Math.round(parseFloat(trackRef.current.dataset.percentage)) /
                    99) *
                    countData[3]
                )
              ) - 1
            ]
        )
      }
    }
  }

  useEffect(() => {
    getCategoryPercents()
    if (trackRef.current && document.getElementById('slide-track') !== null) {
      if (trackRef.current.dataset.percentage === undefined) {
        trackRef.current.dataset.percentage = '-6.5'
      } else {
        trackRef.current.dataset.percentage =
          document.getElementById('side-track')?.style.transform || '-6.5'
      }
      trackRef.current.dataset.mouseDownAt = '0'
      window.addEventListener('keydown', handleKeyPress)
      window.addEventListener('mousedown', handleOnDown)
      window.addEventListener('touchstart', handleOnDown)
      window.addEventListener('mouseup', handleOnUp)
      window.addEventListener('touchend', handleOnUp)
      window.addEventListener('mousemove', handleOnMove)
      window.addEventListener('touchmove', handleOnMove)
      window.addEventListener('wheel', transformScroll)
      document
        .getElementById('dev')
        ?.addEventListener('click', () => alignCategory('Developpeur'))
      document
        .getElementById('2d')
        ?.addEventListener('click', () => alignCategory('Artiste2D'))
      document
        .getElementById('3d')
        ?.addEventListener('click', () => alignCategory('Artiste3D'))
    }
    return () => {
      document
        .getElementById('dev')
        ?.removeEventListener('click', () => alignCategory('Developpeur'))
      document
        .getElementById('2d')
        ?.removeEventListener('click', () => alignCategory('Artiste2D'))
      document
        .getElementById('3d')
        ?.removeEventListener('click', () => alignCategory('Artiste3D'))
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('wheel', transformScroll)
      window.removeEventListener('mousedown', handleOnDown)
      window.removeEventListener('touchstart', handleOnDown)
      window.removeEventListener('mouseup', handleOnUp)
      window.removeEventListener('touchend', handleOnUp)
      window.removeEventListener('mousemove', handleOnMove)
      window.removeEventListener('touchmove', handleOnMove)
    }
  }, [])

  const navigate = useNavigate()

  // Adding event listeners for key press
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.dataset.categorie = 'Developpeur'
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      if (trackRef.current && trackRef.current.dataset.categorie) {
        if (event.key === 'Escape') {
          navigate('/')
          alignCategory(trackRef.current.dataset.categorie)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [navigate])

  const getFirstImageLink = (project: Project, categoryName: string) => {
    const [projectName] = project.name.split('.')
    return {
      section: categoryName,
      name: projectName,
      title: project.title,
      image: `/assets/${projectName}/thumbnail.png`,
      webpImage: `/assets/${projectName}/thumbnail.webp`,
      smallImage: `/assets/${projectName}/thumbnail.opti.png`,
      verySmallImage: `/assets/${projectName}/500-thumbnail.opti.png`,
    }
  }
  const getCategoryWithFirstImages = (data: any) => {
    const categoriesWithFirstImages = []
    for (const category in data) {
      const projects: Array<Project> = data[category]
      const firstImages = projects.map((project: Project) =>
        getFirstImageLink(project, category)
      )
      categoriesWithFirstImages.push({ category, firstImages })
    }
    return categoriesWithFirstImages
  }

  const projectsWithFirstImages = getCategoryWithFirstImages(projectData)

  return (
    <div className="absolute top-1/2 h-[50vh] w-full -translate-y-1/2 sm:h-[60vh]">
      <div
        id="slide-track"
        ref={trackRef}
        className="absolute left-1/2 top-1/2 flex -translate-x-[5.17%] select-none flex-row gap-4 text-white"
      >
        {projectsWithFirstImages.map((categoryData, index) => (
          <div key={index} className="flex flex-row gap-4">
            <div
              id={`${categoryData.category}`}
              className="track-title relative m-0 h-[16vh] w-[16vh] -rotate-90 p-0"
            >
              <h1 className=" text-primary absolute bottom-0 right-0 m-0 p-0 text-right font-primaryFont text-xxxl tracking-wider opacity-100 sm:text-xxxxl">
                {categoryData.category.toUpperCase()}
              </h1>
            </div>
            <div className="relative flex flex-row gap-4">
              {categoryData.firstImages.map(
                (data: any, projectIndex: number) => (
                  <div
                    key={projectIndex}
                    id={`track-image-${index}-${projectIndex}`}
                    className="track-image relative block h-[40vh] w-[15vh] overflow-hidden border-0 p-0 hover:opacity-100 hover:grayscale-0 sm:h-[50vh]"
                  >
                    <div
                      className="thumbnail absolute top-0 h-full w-full bg-cover bg-[right_center]"
                      id={`imageBanner_${index}_${projectIndex}`}
                      style={{
                        backgroundImage: `url(${data.image}), url(${data.smallImage}), url(${data.verySmallImage})`,
                      }}
                    ></div>
                    <Link
                      className="track-link absolute h-full w-full bg-[rgba(0,0,0,0.25)] text-white no-underline grayscale duration-200 hover:bg-[rgba(0,0,0,0)] hover:opacity-0"
                      to={data.name}
                    >
                      <p className="absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 p-0 text-xl ">
                        |
                      </p>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className=" pointer-events-none absolute left-1/2 top-1/2 my-0 h-full w-full -translate-x-1/2 -translate-y-1/2 select-none overflow-clip py-0"
        id="titles"
      >
        {projectsWithFirstImages.map((categoryData, index) => (
          <div
            key={index}
            className="allTitles relative top-0 h-0 w-full"
            id={`titles_${index}`}
          >
            {categoryData.firstImages.map((data: any, projectIndex: number) => (
              <h2
                key={projectIndex}
                id={`title_${data.name}`}
                className="title text-primary secondary-shadow absolute left-0 top-0 my-0 origin-left px-2 font-primaryFont text-xxl md:px-[5vw] md:text-xxxxl"
              >
                {data.title.toUpperCase()}
              </h2>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThumbnailsComponent

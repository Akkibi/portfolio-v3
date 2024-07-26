import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import ThumbnailsWrapperComponent from './components/ThumbnailsWrapperComponent'
import { useNavigationType } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(useGSAP)

function App({
  countData,
  projectList,
}: {
  countData: Array<number>
  projectList: Array<string>
}): JSX.Element {
  const [categorie, setCategorie] = useState('dev')
  const navigationType: string | null = useNavigationType()
  useGSAP(() => {
    gsap.fromTo(
      '#app',
      { opacity: 0, clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
      {
        duration: 2,
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'expo.inOut',
      }
    )
    if (navigationType === 'POP') {
      gsap.to('#slide-track', {
        duration: 0.75,
        y: '-50%',
        ease: 'power2',
      })
      gsap.set('.title', {
        x: 0,
        y: '-200%',
      })
    }
  }, [])
  useGSAP(() => {
    if (navigationType !== 'POP') {
      gsap.to('#slide-track', {
        duration: 0.75,
        y: '-50%',
        ease: 'power2',
      })
    }
  }, [navigationType])
  return (
    <div
      className="bg-secondary absolute left-0 top-0 h-full w-full overflow-hidden p-0 font-secondaryFont"
      id="app"
    >
      <div className="absolute left-1/2 top-1/2 h-[10vh] w-[1px] -translate-x-1/2 -translate-y-1/2 select-none bg-white"></div>

      <Navbar categorie={categorie} setCategorie={setCategorie} />
      <ThumbnailsWrapperComponent
        categorie={categorie}
        setCategorie={setCategorie}
        countData={countData}
        projectList={projectList}
      />
      <Outlet />
      {/* <div
        className="pointer-events-none absolute inset-0 z-50 select-none bg-black"
        id="transition"
      ></div> */}
    </div>
  )
}

// Export the App component as the default export.
export default App

import { gsap } from 'gsap'

export const ProjectRender = (
  projectIndex: number,
  x: MediaQueryList
): void => {
  let selectedWidth: number = window.innerWidth
  if (!x.matches) {
    selectedWidth = window.innerWidth * 0.85
  }
  // Add a class to the selected .track-image element
  gsap.to(document.querySelectorAll('.track-link'), {
    duration: 1.25,
    ease: 'expo.out',
    opacity: 1,
  })
  gsap.to(document.querySelectorAll('.track-link')[projectIndex - 1], {
    duration: 1.25,
    ease: 'expo.out',
    opacity: 0,
  })

  gsap.to(document.querySelectorAll('.track-image'), {
    duration: 1.25,
    width: window.innerHeight * 0.15,
    ease: 'expo.out',
    opacity: 0.75,
  })
  gsap.to(document.querySelectorAll('.track-image')[projectIndex - 1], {
    duration: 1.25,
    width: selectedWidth,
    ease: 'expo.out',
    opacity: 1,
  })

  gsap.to(document.querySelectorAll('.thumbnail')[projectIndex - 1], {
    duration: 1.25,
    ease: 'expo.out',
    backgroundPosition: `50% 50%`,
  })
  gsap.to('#scrollIcon', {
    duration: 1.25,
    ease: 'expo.out',
    opacity: 1,
    display: 'block',
  })
  gsap.to('.title', {
    duration: 0.5,
    ease: 'expo.inOut',
    x: 0,
    y: '-200%',
    overwrite: 'auto',
  })
  gsap.to(`#title_${window.location.pathname.split('/').pop()}`, {
    duration: 1.25,
    ease: 'power3',
    x: 0,
    y: 0,
    overwrite: 'auto',
  })
  gsap.to('#titles', {
    duration: 1.25,
    ease: 'expo.out',
    y: '-50%',
  })
}

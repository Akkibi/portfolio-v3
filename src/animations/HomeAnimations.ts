import { gsap } from 'gsap'
export const HomeComponent = (): void => {
  gsap.to('.track-image', {
    duration: 1,
    ease: 'expo.out',
    width: window.innerHeight * 0.15,
    opacity: 0.75,
    overwrite: true,
    // '-webkit-filter': 'grayscale(100%)',
    // filter: 'grayscale(100%)',
  })
  gsap.to('.track-link', {
    clearProps: 'all',
  })
  gsap.to('#scrollIcon', {
    duration: 1,
    ease: 'expo.out',
    opacity: 0,
    display: 'hidden',
  })
  gsap.to('.title', {
    duration: 0.5,
    ease: 'expo.in',
    rotation: 0,
    x: 0,
    y: '-200%',
    overwrite: true,
  })
  gsap.to('#titles', {
    duration: 0.5,
    ease: 'expo.out',
    y: '-50%',
    overwrite: 'auto',
  })
}

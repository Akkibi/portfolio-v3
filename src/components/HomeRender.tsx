import { gsap } from 'gsap'
export const HomeComponent = (): void => {
  console.log('HomeComponent')
  gsap.to('.track-image', {
    duration: 1,
    ease: 'power2',
    width: window.innerHeight * 0.15,
    opacity: 0.75,
    // '-webkit-filter': 'grayscale(100%)',
    // filter: 'grayscale(100%)',
  })
  gsap.to('.track-link', {
    clearProps: 'all',
  })
  gsap.to('#scrollIcon', {
    duration: 1,
    ease: 'power2',
    opacity: 0,
    display: 'hidden',
  })
  gsap.to('.title', {
    duration: 0.5,
    ease: 'power2.in',
    rotation: 0,
    x: 0,
    y: '-200%',
  })
  gsap.to('#titles', {
    duration: 0.5,
    ease: 'power2',
    y: 0,
  })
}

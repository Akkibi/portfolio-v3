import { gsap } from 'gsap'
export const AboutComponent = (): void => {
  gsap.to('#scrollIcon', {
    duration: 1.5,
    ease: 'expo.out',
    opacity: 0,
    display: 'hidden',
  })
  gsap.fromTo(
    '#about',
    {
      x: 0,
      y: '-100%',
    },
    {
      duration: 1,
      ease: 'expo.out',
      y: 0,
      x: 0,
    }
  )
  gsap.fromTo(
    '#about-title',
    {
      y: '100%',
    },
    {
      delay: 0.25,
      duration: 1.5,
      ease: 'expo.out',
      y: 0,
    }
  )
  gsap.fromTo(
    '#aboutProgressScrollBar',
    {
      x: '-10rem',
    },
    {
      duration: 1.5,
      ease: 'expo.out',
      x: '0rem',
    }
  )
}

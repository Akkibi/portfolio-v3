import { gsap } from 'gsap'
export const AboutComponent = (): void => {
  console.log('AboutComponent')

  gsap.to('#scrollIcon', {
    duration: 1,
    ease: 'power2',
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
      duration: 0.5,
      ease: 'power2.out',
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
      duration: 1,
      ease: 'power2.out',
      y: 0,
    }
  )
}

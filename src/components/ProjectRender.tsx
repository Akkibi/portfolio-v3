import { gsap } from 'gsap'

export const ProjectRender = (
  projectIndex: number,
  index: number,
  x: MediaQueryList
): void => {
  console.log('HomeComponent')
  let selectedWidth: number = window.innerWidth
  if (!x.matches) {
    selectedWidth = window.innerWidth * 0.85
  }
  // Add a class to the selected .track-image element
  const notSelectedImage = document.querySelectorAll('.track-image')
  const selectedImage =
    document.querySelectorAll('.track-image')[projectIndex - 1]
  console.log('Section', index)
  gsap.to(notSelectedImage, {
    duration: 1.25,
    width: window.innerHeight * 0.15,
    ease: 'expo.out',
    opacity: 0.75,

    // '-webkit-filter': 'grayscale(100%)',
    // filter: 'grayscale(100%)',
  })
  gsap.to(document.querySelectorAll('.track-link'), {
    clearProps: 'all',
  })
  gsap.to(document.querySelectorAll('.track-link')[projectIndex - 1], {
    opacity: 0,
    display: 'none',
  })
  gsap.to(selectedImage, {
    duration: 1.25,
    width: selectedWidth,
    ease: 'expo.out',
    opacity: 1,
    grayScale: 0,
    // '-webkit-filter': 'grayscale(0)',
    // filter: 'grayscale(0)',
  })
  gsap.to(document.querySelectorAll('.thumbnail')[projectIndex - 1], {
    duration: 1.25,
    ease: 'expo.out',
    opacity: 1,
    objectPosition: `center center`,
  })
  gsap.to('#scrollIcon', {
    duration: 1.25,
    ease: 'expo.out',
    opacity: 1,
    display: 'block',
  })
  gsap.to('.title', {
    duration: 0.5,
    ease: 'expo.out.in',
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
    y: 0,
  })
}

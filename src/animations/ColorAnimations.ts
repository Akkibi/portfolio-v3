import { gsap } from 'gsap'
export const ColorsRender = (
  primary: string,
  secondary: string,
  speed: number
): void => {
  var tlColors = gsap.timeline()
  tlColors
    .to('.text-primary', {
      duration: speed * 1.5,
      color: primary,
      ease: 'expo.out',
      overwrite: 'auto',
    })

    .to(
      '.bg-primary',
      {
        duration: speed * 1.5,
        backgroundColor: primary,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.text-secondary',
      {
        duration: speed * 1.5,
        color: secondary,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.bg-secondary',
      {
        duration: speed * 1.5,
        backgroundColor: secondary,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.secondary-shadow',
      {
        duration: speed * 1.5,
        textShadow: `0.5vh 0.5vh 0px ${secondary}, -0.5vh -0.5vh 0px ${secondary}, 0.5vh -0.5vh 0px ${secondary}, -0.5vh 0.5vh 0px ${secondary}`,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
}

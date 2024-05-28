import { gsap } from 'gsap'
export const ColorsRender = (
  primary: string,
  secondary: string,
  speed: number
): void => {
  var tlColors = gsap.timeline()
  const speedMultiplier = 1.5
  tlColors
    .to('.text-primary', {
      duration: speed * speedMultiplier,
      color: primary,
      ease: 'expo.out',
      overwrite: 'auto',
    })

    .to(
      '.bg-primary',
      {
        duration: speed * speedMultiplier,
        backgroundColor: primary,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.text-secondary',
      {
        duration: speed * speedMultiplier,
        color: secondary,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.bg-secondary',
      {
        duration: speed * speedMultiplier,
        backgroundColor: secondary,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.secondary-shadow',
      {
        duration: speed * speedMultiplier,
        textShadow: `0.5vh 0.5vh 0px ${secondary}, -0.5vh -0.5vh 0px ${secondary}, 0.5vh -0.5vh 0px ${secondary}, -0.5vh 0.5vh 0px ${secondary}`,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.primary-border',
      {
        duration: speed * speedMultiplier,
        borderColor: primary,
        ease: 'expo.out',
        overwrite: 'auto',
      },
      '<'
    )
}

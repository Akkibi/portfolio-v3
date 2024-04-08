import { gsap } from 'gsap'
export const ColorsRender = (
  primary: string,
  secondary: string,
  speed: number
): void => {
  console.log('Change Colors')
  var tlColors = gsap.timeline()
  tlColors
    .to('.text-primary', {
      duration: speed,
      color: primary,
      ease: 'power2',
      overwrite: 'auto',
    })
    .to(
      '.border-primary',
      {
        duration: speed,
        border: `1px solid ${primary}`,
        ease: 'power2',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.bg-primary',
      {
        duration: speed,
        backgroundColor: primary,
        ease: 'power2',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.text-secondary',
      {
        duration: speed,
        color: secondary,
        ease: 'power2',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.border-secondary',
      {
        duration: speed,
        borderColor: secondary,
        ease: 'power2',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.bg-secondary',
      {
        duration: speed,
        backgroundColor: secondary,
        ease: 'power2',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.secondary-shadow',
      {
        duration: speed,
        textShadow: `0.5vh 0.5vh 0px ${secondary}, -0.5vh -0.5vh 0px ${secondary}, 0.5vh -0.5vh 0px ${secondary}, -0.5vh 0.5vh 0px ${secondary}`,
        ease: 'power2',
        overwrite: 'auto',
      },
      '<'
    )
    .to(
      '.transparent-secondary',
      {
        duration: speed,
        backgroundColor: `${secondary}ee`,
        ease: 'power2',
        overwrite: 'auto',
      },
      '<'
    )
}

import { useNavigationType } from 'react-router-dom'
import { useEffect } from 'react'
import { ColorsRender } from './changeColors.ts'
function LoadAnimation({ anim }: { anim: Function }) {
  const navigationType: string | null = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') {
      ColorsRender('#fff', '#111', 0.1)
      anim()
    }
  })
  if (navigationType !== 'POP') {
    ColorsRender('#fff', '#111', 0.1)
    anim()
  }
  return <></>
}

export default LoadAnimation

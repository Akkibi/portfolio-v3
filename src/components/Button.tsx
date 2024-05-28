import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  path: string
  innerSite: boolean
  children?: ReactNode // Allow children elements
}

const Button: React.FC<ButtonProps> = ({ path, innerSite, children }) => {
  return (
    <div className="text-primary decoration-none relative h-fit whitespace-nowrap font-secondaryFont text-xl uppercase text-white underline visited:text-white">
      {innerSite ? (
        <Link className="group w-max" to={path}>
          <svg
            className="absolute right-full top-1/2 h-[1.5vh] w-[1.5vh] -translate-x-1/2 -translate-y-1/2 opacity-0 duration-150 group-hover:opacity-100"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M 1 23 L 23 1"></path>
            <path d="M 6 1 h 17 v 17"></path>
          </svg>
          {children}
        </Link>
      ) : (
        <a
          className="group w-max"
          href={path}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            className="absolute right-full top-1/2 h-[1.5vh] w-[1.5vh] -translate-x-1/2 -translate-y-1/2 opacity-0 duration-150 group-hover:opacity-100"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M 1 23 L 23 1"></path>
            <path d="M 6 1 h 17 v 17"></path>
          </svg>
          {children}
        </a>
      )}
    </div>
  )
}

export default Button

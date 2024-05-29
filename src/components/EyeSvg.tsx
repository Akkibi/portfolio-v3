import React from 'react'

interface Props {
  moving: boolean
}

const MyComponent: React.FC<Props> = ({ moving }) => {
  return (
    <span
      className={
        'text-primary m-0 font-secondaryFont text-xxl uppercase underline'
      }
    >
      <svg
        className="mr-1 h-[4vh] w-[4vh]"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="4"></circle>
      </svg>
      <svg
        className={
          'relative mr-1 h-[4vh] w-[4vh]' +
          (moving ? ' rotate-180' : 'rotate-0')
        }
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          ></path>
        </g>
        <g id="SVGRepo_iconCarrier" className="rotate-180 animate-bounce">
          <path
            d="M12 12V18"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          ></path>
          <path
            d="M15 15L12 18L9 15"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          ></path>
        </g>
      </svg>
    </span>
  )
}

export default MyComponent

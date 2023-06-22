import React from 'react'

type Color = 'gray'

type Shade = '400'

type Props = {
  color: `text-${Color}-${Shade}`
}

export default function OptionsIcon({ color }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      className={color}
    >
      <circle
        cx="20"
        cy="14"
        r="2"
        fill="currentColor"
        className="text-grey-500"
      />
      <circle
        cx="20"
        cy="20"
        r="2"
        fill="currentColor"
        className="text-grey-500"
      />
      <circle
        cx="20"
        cy="26"
        r="2"
        fill="currentColor"
        className="text-grey-500"
      />
    </svg>
  )
}

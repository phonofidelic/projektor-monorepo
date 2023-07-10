import React from 'react'
import { IconProps } from './IconProps'

export default function OptionsIcon({ color }: IconProps) {
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

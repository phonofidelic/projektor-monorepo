import React from 'react'
import { IconProps } from './IconProps'

export default function EditIcon({ color }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none">
      <path
        className={color}
        d="M0 15.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L14.81 7.94l-3.75-3.75L.15 15.1c-.1.1-.15.22-.15.36ZM17.71 5.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
      />
    </svg>
  )
}

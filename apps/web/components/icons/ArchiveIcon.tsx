import React from 'react'
import { IconProps } from './IconProps'

export default function ArchiveIcon({ color }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
      <path
        className={color}
        d="M17.54 2.23 16.15.55C15.88.21 15.47 0 15 0H3c-.47 0-.88.21-1.16.55L.46 2.23C.17 2.57 0 3.02 0 3.5V16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3.5c0-.48-.17-.93-.46-1.27ZM8.65 14.15 3.5 9H7V7h4v2h3.5l-5.15 5.15c-.19.19-.51.19-.7 0ZM2.12 2l.81-1h12l.94 1H2.12Z"
      />
    </svg>
  )
}

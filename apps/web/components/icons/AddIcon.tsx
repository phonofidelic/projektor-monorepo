import React from 'react'
import { IconProps } from './IconProps'

export default function AddIcon({ color }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path className={color} d="M14 8H8v6H6V8H0V6h6V0h2v6h6v2Z" />
    </svg>
  )
}

'use client'

import * as React from 'react'
type ButtonProps = {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
}
export const Button = ({ onClick }: ButtonProps) => {
  return <button onClick={onClick}>Boop</button>
}

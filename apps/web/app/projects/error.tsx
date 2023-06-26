'use client'
import React, { useEffect } from 'react'

type Props = {
  error: Error
  reset: () => void
}

export default function ProjectsError({ error, reset }: Props) {
  useEffect(() => {
    console.error('Projects page error:', error)
  }, [error])
  return (
    <div>
      <p>Something went wrong...</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

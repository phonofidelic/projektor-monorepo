'use client'
import React from 'react'
import { Project } from '@projektor/types'
import Link from 'next/link'

type Props = {
  project: Project
}

export default function ProjectGridItem({ project }: Props) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <div className="p-4 flex space-x-2 border border-gray-200 rounded hover:bg-gray-100">
        <div></div>
        <div className="truncate flex-1">
          <h2 className="truncate whitespace-nowrap">{project.title}</h2>
          <p className="text-gray-400">{project.description}</p>
        </div>
        <div className="w-10 flex flex-col justify-center">
          <button
            className="rounded-full w-10 h-10 border hover:bg-gray-300"
            onClick={(event) => {
              event.preventDefault()
            }}
          >
            ...
          </button>
        </div>
      </div>
    </Link>
  )
}

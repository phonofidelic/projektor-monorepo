'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Project } from '@projektor/types'
import { OptionsMenu, OptionsMenuItem } from './OptionsMenu'
import { useRouter } from 'next/navigation'

type Props = {
  project: Project
}

export default function ProjectGridItem({ project }: Props) {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <Link key={project.id} href={`/project/${project.slug}`}>
      <div
        className="p-4 flex space-x-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
        style={{
          borderLeft: `4px solid ${project.theme}`,
        }}
      >
        <div></div>
        <div className="truncate flex-1">
          <h2 className="truncate whitespace-nowrap">{project.title}</h2>
          <p className="text-gray-400">{project.description}</p>
        </div>
        <div className="w-10 flex flex-col justify-center">
          <OptionsMenu
            open={optionsMenuOpen}
            onOpen={() => setOptionsMenuOpen(true)}
            onClose={() => setOptionsMenuOpen(false)}
          >
            <OptionsMenuItem
              onSelect={() => {
                setOptionsMenuOpen(false)
                router.push(`/project/${project.slug}/edit`)
              }}
            >
              Edit
            </OptionsMenuItem>
            <OptionsMenuItem
              onSelect={() => {
                setOptionsMenuOpen(false)
                console.log('TODO: Archive project')
              }}
            >
              Archive
            </OptionsMenuItem>
            <OptionsMenuItem
              onSelect={() => {
                setOptionsMenuOpen(false)
                console.log('TODO: Move project to trash')
              }}
            >
              Move to trash
            </OptionsMenuItem>
          </OptionsMenu>
        </div>
      </div>
    </Link>
  )
}

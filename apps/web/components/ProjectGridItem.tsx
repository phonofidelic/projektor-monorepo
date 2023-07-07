'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Project, ProjectStatus } from '@projektor/types'
import { OptionsMenu, OptionsMenuItem } from './OptionsMenu'
import { useRouter } from 'next/navigation'
import { authFetch } from '@/utils'

const PROJECT_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  REMOVED: 'removed',
} as const

type Props = {
  project: Project
}

export default function ProjectGridItem({ project }: Props) {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
  const router = useRouter()

  const handleSetProjectStatus = async (
    projectId: string,
    status: ProjectStatus
  ) => {
    await authFetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects/${projectId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          status,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
    router.refresh()
  }

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
          <h2 className="truncate whitespace-nowrap">
            {project.title} | {project.status}
          </h2>
          <p className="text-gray-400">{project.description}</p>
        </div>
        <div className="w-10 flex flex-col justify-center">
          <OptionsMenu
            open={optionsMenuOpen}
            onOpen={() => setOptionsMenuOpen(true)}
            onClose={() => setOptionsMenuOpen(false)}
          >
            <ProjectOptionMenuItems
              project={project}
              onSetProjectStatus={handleSetProjectStatus}
              onCloseMenu={() => setOptionsMenuOpen(false)}
            />
          </OptionsMenu>
        </div>
      </div>
    </Link>
  )
}

function ProjectOptionMenuItems({
  project,
  onSetProjectStatus,
  onCloseMenu,
}: {
  project: Project
  onSetProjectStatus: (projectId: string, projectStatus: ProjectStatus) => void
  onCloseMenu: () => void
}) {
  const router = useRouter()
  switch (project.status) {
    case 'active':
      return (
        <>
          <OptionsMenuItem
            onSelect={() => {
              router.push(`/project/${project.slug}/edit`)
              onCloseMenu()
            }}
          >
            Edit
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus(project.id, PROJECT_STATUS.ARCHIVED)
              onCloseMenu()
            }}
          >
            Archive
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus(project.id, PROJECT_STATUS.REMOVED)
              onCloseMenu()
            }}
          >
            Move to trash
          </OptionsMenuItem>
        </>
      )
    case 'archived':
      return (
        <>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus(project.id, PROJECT_STATUS.ACTIVE)
              onCloseMenu()
            }}
          >
            Activate
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus(project.id, PROJECT_STATUS.REMOVED)
              onCloseMenu()
            }}
          >
            Move to trash
          </OptionsMenuItem>
        </>
      )
    case 'removed':
      return (
        <>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus(project.id, PROJECT_STATUS.ACTIVE)
              onCloseMenu()
            }}
          >
            Activate
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus(project.id, PROJECT_STATUS.ARCHIVED)
              onCloseMenu()
            }}
          >
            Archive
          </OptionsMenuItem>
        </>
      )
    default:
      console.error(`Invalid project status "${project.status}"`)
      return null
  }
}

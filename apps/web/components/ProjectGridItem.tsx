'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Project, ProjectStatus } from '@projektor/types'
import { authFetch } from '@/utils'
import { OptionsMenu, OptionsMenuItem } from './OptionsMenu'
import ProjectGridItemSkeleton from './ProjectGridItemSkeleton'

const editProject = async (projectId: string, status: ProjectStatus) => {
  const response = await authFetch(
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

  return response.json()
}

type Props = {
  project: Project
}

export default function ProjectGridItem({ project }: Props) {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (update: { projectId: string; status: ProjectStatus }) =>
      editProject(update.projectId, update.status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  })

  if (mutation.isLoading) {
    return <ProjectGridItemSkeleton />
  }

  return (
    <Link key={project.id} href={`/project/${project.slug}`}>
      <div
        className="h-[82px] p-4 flex space-x-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
        style={{
          borderLeft: `4px solid ${project.theme}`,
        }}
      >
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
              onSetProjectStatus={mutation.mutate}
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
  onSetProjectStatus: (update: {
    projectId: string
    status: ProjectStatus
  }) => void
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
              onSetProjectStatus({ projectId: project.id, status: 'archived' })
              onCloseMenu()
            }}
          >
            Archive
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus({ projectId: project.id, status: 'removed' })
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
              onSetProjectStatus({ projectId: project.id, status: 'active' })
              onCloseMenu()
            }}
          >
            Activate
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus({ projectId: project.id, status: 'removed' })
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
              onSetProjectStatus({ projectId: project.id, status: 'active' })
              onCloseMenu()
            }}
          >
            Activate
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus({ projectId: project.id, status: 'archived' })
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

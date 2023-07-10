'useClient'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Project, ProjectStatus } from '@projektor/types'
import { OptionsMenuItem } from './OptionsMenu'
import ActivateIcon from './icons/ActivateIcon'
import ArchiveIcon from './icons/ArchiveIcon'
import EditIcon from './icons/EditIcon'
import RemoveIcon from './icons/TrashIcon'

export default function ProjectOptionMenuItems({
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
  const referrerPathname = usePathname()

  switch (project.status) {
    case 'active':
      return (
        <>
          <OptionsMenuItem
            onSelect={() => {
              router.push(
                `/project/${project.slug}/edit?ref=${referrerPathname}`
              )
              onCloseMenu()
            }}
          >
            <EditLabel />
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus({ projectId: project.id, status: 'archived' })
              onCloseMenu()
            }}
          >
            <ArchiveLabel />
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus({ projectId: project.id, status: 'removed' })
              onCloseMenu()
            }}
          >
            <RemoveLabel />
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
            <ActivateLabel />
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus({ projectId: project.id, status: 'removed' })
              onCloseMenu()
            }}
          >
            <RemoveLabel />
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
            <ActivateLabel />
          </OptionsMenuItem>
          <OptionsMenuItem
            onSelect={() => {
              onSetProjectStatus({ projectId: project.id, status: 'archived' })
              onCloseMenu()
            }}
          >
            <ArchiveLabel />
          </OptionsMenuItem>
        </>
      )
    default:
      console.error(`Invalid project status "${project.status}"`)
      return null
  }
}

function ActivateLabel() {
  return (
    <div className="flex space-x-2">
      <div className="flex flex-col justify-center w-5">
        <div className="m-auto">
          <ActivateIcon color="fill-gray-700" />
        </div>
      </div>
      <p>Activate</p>
    </div>
  )
}

function ArchiveLabel() {
  return (
    <div className="flex space-x-2">
      <div className="flex flex-col justify-center w-5">
        <div className="m-auto">
          <ArchiveIcon color="fill-gray-700" />
        </div>
      </div>
      <p>Archive</p>
    </div>
  )
}

function EditLabel() {
  return (
    <div className="flex space-x-2">
      <div className="flex flex-col justify-center w-5">
        <div className="m-auto">
          <EditIcon color="fill-gray-700" />
        </div>
      </div>
      <p>Edit</p>
    </div>
  )
}

function RemoveLabel() {
  return (
    <div className="flex space-x-2">
      <div className="flex flex-col justify-center w-5">
        <div className="m-auto">
          <RemoveIcon color="fill-gray-700" />
        </div>
      </div>
      <p>Move to trash</p>
    </div>
  )
}

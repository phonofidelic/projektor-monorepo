'use client'
import React, { useState } from 'react'
import { Project, ProjectStatus } from '@projektor/types'
import { authFetch } from '@/utils'
import { OptionsMenu } from './OptionsMenu'
import ProjectOptionMenuItems from './ProjectOptionMenuItems'
import OptionsIcon from './icons/OptionsIcon'

type Props = {
  project: Project
}

const setProjectStatus = async ({
  projectId,
  status,
}: {
  projectId: string
  status: ProjectStatus
}) => {
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

export default function ProjectOptionsMenu({ project }: Props) {
  const [optionsMenuOpen, setOptionsMenuOpen] = useState(false)
  return (
    <OptionsMenu
      menuButtonClassName="rounded-full w-[42px] h-[42px] border border-gray-200 hover:bg-gray-100"
      menuButtonContent={<OptionsIcon color="fill-gray-700" />}
      open={optionsMenuOpen}
      onOpen={() => setOptionsMenuOpen(true)}
      onClose={() => setOptionsMenuOpen(false)}
    >
      <ProjectOptionMenuItems
        project={project}
        onSetProjectStatus={setProjectStatus}
        onCloseMenu={() => setOptionsMenuOpen(false)}
      />
    </OptionsMenu>
  )
}

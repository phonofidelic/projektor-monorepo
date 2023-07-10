'use client'
import React from 'react'
import AddIcon from './icons/AddIcon'
import { useRouter } from 'next/navigation'
import { useProjectsFilter } from '@/contexts/ProjectsFilterContext'

type Props = {}

export default function CreateProjectButton({}: Props) {
  const router = useRouter()
  const { statusFilter } = useProjectsFilter()

  if (statusFilter === 'active') {
    return (
      <button
        className="rounded-full w-[42px] h-[42px] border border-gray-200 hover:bg-gray-100 p-2"
        name="Create a new project"
        onClick={() => router.push('/project/create')}
      >
        <div className="m-auto w-[14px]">
          <AddIcon color="fill-gray-700" />
        </div>
      </button>
    )
  }

  return null
}

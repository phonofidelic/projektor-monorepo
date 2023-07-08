'use client'
import React, { useState } from 'react'
import { OptionsMenu, OptionsMenuItem } from './OptionsMenu'
import { useProjectsFilter } from '@/contexts/ProjectsFilterContext'
import { ProjectStatus } from '@projektor/types'
import clsx from 'clsx'

export default function ProjectStatusFilter() {
  const [open, setOpen] = useState(false)
  const { statusFilter, setStatusFilter } = useProjectsFilter()

  return (
    <OptionsMenu
      menuButtonContent={<FilterButton text={statusFilter} />}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <OptionsMenuItem
        onSelect={() => {
          setStatusFilter('active')
          setOpen(false)
        }}
      >
        Active
      </OptionsMenuItem>
      <OptionsMenuItem
        onSelect={() => {
          setStatusFilter('archived')
          setOpen(false)
        }}
      >
        Archived
      </OptionsMenuItem>
      <OptionsMenuItem
        onSelect={() => {
          setStatusFilter('removed')
          setOpen(false)
        }}
      >
        Removed
      </OptionsMenuItem>
    </OptionsMenu>
  )
}

function FilterButton({ text }: { text: ProjectStatus }) {
  return (
    <div className="rounded-full flex space-x-2 border border-gray-200 hover:bg-gray-100 p-2 pl-3">
      <div>{text.toUpperCase()}</div>
      <div
        className={clsx('rounded-full m-auto w-4 h-4', {
          'bg-green-400': text === 'active',
          'bg-yellow-400': text === 'archived',
          'bg-red-400': text === 'removed',
        })}
      />
    </div>
  )
}

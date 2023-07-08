'use client'
import React, { useState } from 'react'
import { OptionsMenu, OptionsMenuItem } from './OptionsMenu'
import { useProjectsFilter } from '@/contexts/ProjectsFilterContext'

export default function ProjectStatusFilter() {
  const [open, setOpen] = useState(false)
  const { statusFilter, setStatusFilter } = useProjectsFilter()

  return (
    <OptionsMenu
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

  return (
    <button className="rounded border border-gray-200 hover:bg-gray-100 p-2">
      {statusFilter.toUpperCase()}
    </button>
  )
}

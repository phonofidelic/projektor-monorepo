'use client'
import React, { createContext, useContext, useState } from 'react'
import { ProjectStatus } from '@projektor/types'

type ProjectFilterContextValue = {
  statusFilter: ProjectStatus
  setStatusFilter(status: ProjectStatus): void
}

const ProjectFilterContext = createContext<ProjectFilterContextValue | null>(
  null
)

type ProjectFilterContextProviderProps = {
  children: React.ReactNode
}

export const ProjectFilterContextProvider = ({
  children,
}: ProjectFilterContextProviderProps) => {
  const [statusFilter, setStatusFilterState] = useState<ProjectStatus>(
    localStorage.getItem('filter') as ProjectStatus
  )

  const setStatusFilter = (statusFilter: ProjectStatus) => {
    localStorage.setItem('filter', statusFilter)
    setStatusFilterState(statusFilter)
  }

  return (
    <ProjectFilterContext.Provider value={{ statusFilter, setStatusFilter }}>
      {children}
    </ProjectFilterContext.Provider>
  )
}

export const useProjectsFilter = () => {
  const context = useContext(ProjectFilterContext)
  if (!context) {
    throw new Error(
      '`useProjectFilter` must be used within a `ProjectFilterContextProvider`'
    )
  }

  // return [context.statusFilter, context.setStatusFilter]
  return context
}

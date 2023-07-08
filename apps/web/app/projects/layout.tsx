'use client'
import { ProjectFilterContextProvider } from '@/contexts/ProjectsFilterContext'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function ProjectsLayout({ children }: Props) {
  return <ProjectFilterContextProvider>{children}</ProjectFilterContextProvider>
}

import React from 'react'
import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import Link from 'next/link'
import { authFetch } from '@/utils'
import ProjectStatusFilter from '@/components/ProjectStatusFilter'
import ProjectList from '@/components/ProjectList'
import AddIcon from '@/components/icons/AddIcon'
import CreateProjectButton from '@/components/CreateProjectButton'

type FetchProjectsResponse = {
  projects?: Project[]
}

export default async function ProjectsPage() {
  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects?filter=active`
  )

  const { projects }: FetchProjectsResponse = await response.json()

  return (
    <>
      <div className="sticky top-0 bg-white z-20">
        <Header title="Projects">
          <div className="flex space-x-2">
            <ProjectStatusFilter />
            <CreateProjectButton />
          </div>
        </Header>
      </div>
      <ProjectList initialProjects={projects} />
    </>
  )
}

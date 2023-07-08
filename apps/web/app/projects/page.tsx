import React from 'react'
import { Project } from '@projektor/types'
import { Header } from '@projektor/ui'
import ProjectGridItem from '@/components/ProjectGridItem'
import Link from 'next/link'
import { authFetch } from '@/utils'
import ProjectStatusFilter from '@/components/ProjectStatusFilter'
import ProjectList from '@/components/ProjectList'

type FetchProjectsResponse = {
  projects?: Project[]
}

export default async function ProjectsPage() {
  const response = await authFetch(
    `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects?limit=10`
  )

  const { projects }: FetchProjectsResponse = await response.json()

  return (
    <>
      <div className="sticky top-0 bg-white z-20">
        <Header title="Projects">
          <div className="flex space-x-2">
            <ProjectStatusFilter />
            <Link href={'/project/create'}>
              <button className="rounded border border-gray-200 hover:bg-gray-100 p-2">
                {'New project'.toUpperCase()}
              </button>
            </Link>
          </div>
        </Header>
      </div>
      <ProjectList initialProjects={projects} />
    </>
  )
}

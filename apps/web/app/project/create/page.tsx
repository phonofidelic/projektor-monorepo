import { Header } from '@projektor/ui'
import React from 'react'
import CreateProjectForm from '../../../components/CreateProjectForm'

type Props = {}

export default function CreateProjectPage({}: Props) {
  return (
    <>
      <div className="sticky top-0 bg-white z-20">
        <Header title="Create a new project" />
      </div>
      <CreateProjectForm />
    </>
  )
}

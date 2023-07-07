'use client'
import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@projektor/types'
import TextInput from './TextInput'
import { authFetch } from '@/utils'
import { useUser } from '@/contexts/UserContext'

type Props = {}

export default function CreateProjectForm({}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { user } = useUser()
  const [themeValue, setThemeValue] = useState('#000000')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects`,
      {
        method: 'POST',
        body: JSON.stringify({ ...formJson, userId: user.id }),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )

    const { project }: { project: Project } = await response.json()

    startTransition(() => router.push(`/project/${project.slug}`))
    startTransition(() => router.refresh())
  }

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <form onSubmit={handleSubmit} method="post">
      <div className="p-4 max-w-xl mx-auto grid grid-cols-1 gap-4">
        <div className="flex space-x-4 w-full">
          <TextInput
            inputId="project-title"
            type="text"
            name="title"
            label="Project Title"
            autofocus
          />
          <div className="relative mt-4">
            <input
              type="color"
              id="project-theme"
              name="theme"
              onChange={(event) => setThemeValue(event.target.value)}
              className="
                h-[42px] 
                rounded 
                cursor-pointer
                outline-gray-400
                border-none
                peer"
              style={{ backgroundColor: themeValue }}
            />
            <label
              htmlFor="project-theme"
              className="
                sr-only
                absolute
                -top-4
                left-0
                text-sm
                bg-white
                "
            >
              Theme
            </label>
          </div>
        </div>
        <div className="relative">
          <textarea
            id="project-description"
            name="description"
            placeholder="Description"
            className="
              outline-gray-400 
              border 
              w-full 
              p-2 
              placeholder-transparent 
              peer"
          />
          <label
            htmlFor="project-description"
            className="
              absolute
              -top-4
              left-2
              p-1
              text-sm 
              text-gray-400 
              peer-focus:text-gray-400 
              bg-white 
              peer-placeholder-shown:top-2
              peer-placeholder-shown:text-base
              peer-placeholder-shown:p-0
              peer-placeholder-shown:text-black
              peer-focus:-top-4
              peer-focus:text-sm
              peer-focus:p-1
              transition-all"
          >
            Description
          </label>
        </div>
        <div className="w-full flex justify-center">
          <input
            type="submit"
            value={'Create project'.toUpperCase()}
            className="border rounded border-gray-200 hover:bg-gray-100 p-2 cursor-pointer"
          />
        </div>
      </div>
    </form>
  )
}

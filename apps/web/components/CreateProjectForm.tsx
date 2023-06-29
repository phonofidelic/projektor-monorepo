'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@projektor/types'

type Props = {}

export default function CreateProjectForm({}: Props) {
  const router = useRouter()
  const [themeValue, setThemeValue] = useState('#000000')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/projects`,
      {
        method: 'POST',
        body: JSON.stringify(formJson),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )

    // console.log('response', await response.json())
    const { project }: { project: Project } = await response.json()
    router.push(`/projects/${project.slug}`)
  }

  return (
    <form onSubmit={handleSubmit} method="post">
      <div className="p-4 max-w-xl mx-auto grid grid-cols-1 gap-4">
        <div className="flex space-x-4 w-full">
          <div className="w-full relative">
            <input
              id="project-title"
              name="project_title"
              type="text"
              autoFocus
              placeholder="Project title"
              className="
                border 
                rounded 
                w-full 
                p-2 
                peer 
                outline-gray-400
                placeholder-transparent"
            />
            <label
              htmlFor="project-title"
              className="
                absolute 
                left-2
                -top-4
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
              Project title
            </label>
          </div>
          <div className="relative">
            <input
              type="color"
              id="project-theme"
              name="project_theme"
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
            name="project_description"
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

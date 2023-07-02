'use client'
import React from 'react'
import TextInput from './TextInput'

type Props = {}

export default function LoginForm({}: Props) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify(formJson),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )

    console.log('response', await response.json())
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextInput inputId="email" type="email" name="email" label="Email" />
      <TextInput
        inputId="password"
        type="password"
        name="password"
        label="Password"
      />
      <div className="mt-4">
        <input
          type="submit"
          className="border rounded border-gray-200 hover:bg-gray-100 p-2 cursor-pointer"
        />
      </div>
    </form>
  )
}

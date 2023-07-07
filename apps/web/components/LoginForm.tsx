'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import TextInput from '@/components/TextInput'
import { useUser } from '@/contexts/UserContext'

type Props = {}

export default function LoginForm({}: Props) {
  const { login } = useUser()
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await login(event)
    router.back()
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

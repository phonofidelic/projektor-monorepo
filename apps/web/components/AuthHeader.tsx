'use client'
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'

type Props = {}

export default function AuthHeader({}: Props) {
  const { isAuthenticated, user } = useUser()
  console.log('isAuthenticated', isAuthenticated)

  if (isAuthenticated) {
    return (
      <>
        {user && <p>hello {user.name ?? user.email}</p>}
        <Link
          href="/confirm-logout"
          className="border rounded border-gray-200 hover:bg-gray-100 p-2 cursor-pointer"
        >
          Logout
        </Link>
      </>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className="border rounded border-gray-200 hover:bg-gray-100 p-2 cursor-pointer"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="border rounded border-gray-200 hover:bg-gray-100 p-2 cursor-pointer"
      >
        Create account
      </Link>
    </>
  )
}

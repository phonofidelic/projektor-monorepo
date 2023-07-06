'use client'
import React from 'react'
import Link from 'next/link'
import { Header } from '@projektor/ui'
import { useUser } from '@/contexts/UserContext'
import Modal from '@/components/Modal'

export default function Login() {
  const { logout } = useUser()

  const handleLogout = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    logout()

    await fetch('/logout')
  }

  return (
    <Modal>
      <Header title="Are you sure you want to log out?" />
      <div className="p-4">
        <div className="max-w-xl mx-auto">
          <Link
            href="/"
            onClick={logout}
            className="border rounded border-gray-200 hover:bg-gray-100 p-2 cursor-pointer"
          >
            Logout
          </Link>
        </div>
      </div>
    </Modal>
  )
}

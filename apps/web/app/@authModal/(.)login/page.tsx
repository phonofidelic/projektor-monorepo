'use client'
import { Header } from '@projektor/ui'
import { useRouter } from 'next/navigation'
import React from 'react'
import TextInput from '../../../components/TextInput'
import LoginForm from '../../../components/LoginForm'

type ModalProps = {
  children: React.ReactNode
}

const Modal = ({ children }: ModalProps) => {
  const router = useRouter()

  return (
    <div
      className="
      fixed
      top-0
      left-0
      w-full 
      h-screen 
      z-10 
      bg-black/40"
      onClick={() => router.back()}
    >
      <div className="max-w-xl mx-auto mt-32 p-4 bg-white rounded">
        <div className="flex justify-end">
          <button
            onClick={(event) => {
              event.stopPropagation()
              router.back()
            }}
          >
            Close
          </button>
        </div>
        <div onClick={(event) => event.stopPropagation()}>{children}</div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Modal>
      <Header title="Login" />
      <div className="p-4">
        <div className="max-w-xl mx-auto">
          <LoginForm />
        </div>
      </div>
    </Modal>
  )
}

import { Header } from '@projektor/ui'
import React from 'react'
import LoginForm from '../../../components/LoginForm'
import Modal from '../../../components/Modal'

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

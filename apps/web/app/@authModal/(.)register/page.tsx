import { Header } from '@projektor/ui'
import React from 'react'
import Modal from '../../../components/Modal'
import RegistrationForm from '../../../components/RegistrationForm'

export default function Login() {
  return (
    <Modal>
      <Header title="Create a new account" />
      <div className="p-4">
        <div className="max-w-xl mx-auto">
          <RegistrationForm />
        </div>
      </div>
    </Modal>
  )
}

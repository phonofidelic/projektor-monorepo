import { Header } from '@projektor/ui'
import RegistrationForm from '../../components/RegistrationForm'

export default function Page() {
  return (
    <>
      <Header title="Create a new account" />
      <div className="p-4">
        <div className="max-w-xl mx-auto">
          <RegistrationForm />
        </div>
      </div>
    </>
  )
}

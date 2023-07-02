import { Header } from '@projektor/ui'
import TextInput from '../../components/TextInput'
import LoginForm from '../../components/LoginForm'

export default function Page() {
  return (
    <>
      <Header title="Login" />
      <div className="p-4">
        <div className="max-w-xl mx-auto">
          <LoginForm />
        </div>
      </div>
    </>
  )
}

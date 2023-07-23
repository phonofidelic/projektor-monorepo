import Link from 'next/link'
import AuthHeader from '../components/AuthHeader'
import { Header } from '@projektor/ui'

export default function Page() {
  return (
    <>
      <Header title="Projektor">
        <div className="flex space-x-2">
          <AuthHeader />
        </div>
      </Header>
      <div className="p-4">
        <p>Welcome to Projektor!</p>
        <p>
          This is a demo app that I am using to explore the different tools and
          technologies used to build it. More info to come.
        </p>
      </div>
    </>
  )
}

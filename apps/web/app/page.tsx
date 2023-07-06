import Link from 'next/link'
import AuthHeader from '../components/AuthHeader'
import { Header } from '@projektor/ui'

export default function Page() {
  return (
    <>
      <Header title="Menu">
        <div className="flex space-x-2">
          <AuthHeader />
        </div>
      </Header>
      <div className="p-4">
        <Link href="/projects">Projects</Link>
      </div>
    </>
  )
}

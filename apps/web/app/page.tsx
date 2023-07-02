import { Header } from '@projektor/ui'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Header title="Menu">
        <Link href="/login">Login</Link>
      </Header>
      <div className="p-4">
        <Link href="/projects">Projects</Link>
      </div>
    </>
  )
}

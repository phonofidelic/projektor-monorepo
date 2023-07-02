import { Header } from '@projektor/ui'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Header title="Menu">
        <div className="flex space-x-2">
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
        </div>
      </Header>
      <div className="p-4">
        <Link href="/projects">Projects</Link>
      </div>
    </>
  )
}

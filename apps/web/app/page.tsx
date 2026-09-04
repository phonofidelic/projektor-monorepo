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
          A project and time management application built with Next.js, NestJS,
          Prisma, and shared Turborepo packages.
        </p>
      </div>
    </>
  )
}

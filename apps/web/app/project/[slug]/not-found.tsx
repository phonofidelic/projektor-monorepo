import React from 'react'
import { Header } from '@projektor/ui'

type Props = {}

export default function NotFoundPage({}: Props) {
  return (
    <>
      <Header title="Oops!" />
      <div>
        <p>We could not find your project :(</p>
      </div>
    </>
  )
}

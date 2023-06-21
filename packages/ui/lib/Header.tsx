import * as React from 'react'

type HeaderProps = {
  title: string
}
export const Header = ({ title }: HeaderProps) => {
  return <h1 className="text-2xl">{title}</h1>
}

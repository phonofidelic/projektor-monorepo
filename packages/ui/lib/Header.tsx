import * as React from 'react'

type HeaderProps = {
  title: string
  children?: React.ReactNode
}
export const Header = ({ title, children }: HeaderProps) => {
  return (
    <div className="flex justify-between p-4">
      <h1 className="text-2xl">{title}</h1>
      <div className="mt-auto">{children}</div>
    </div>
  )
}

import * as React from 'react'

type HeaderProps = {
  title: string
  backButton?: React.ReactNode
  children?: React.ReactNode
}
export const Header = ({ title, backButton, children }: HeaderProps) => {
  return (
    <div className="flex justify-between p-4">
      <div className="flex space-x-2">
        {backButton}
        <h1 className="text-2xl leading-[42px]">{title}</h1>
      </div>
      <div className="mt-auto">{children}</div>
    </div>
  )
}

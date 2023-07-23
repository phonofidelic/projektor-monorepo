'use client'
import { useUser } from '@/contexts/UserContext'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

type Props = {}

export default function Navigation({}: Props) {
  const { isAuthenticated } = useUser()
  const [open, setOpen] = useState(false)

  const navLinks = [
    {
      label: 'Settings',
      href: '/',
    },
    {
      label: 'Projects',
      href: '/projects',
    },
  ]

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="">
      <div
        onClick={() => setOpen(false)}
        className={clsx(
          'fixed md:hidden top-0 left-0 w-screen h-screen md:bg-none transition-all',
          {
            'bg-gray-400/20 z-30': open,
            'bg-black/0 -z-30': !open,
          }
        )}
      />
      <div
        className={clsx(
          'fixed md:relative z-40 md:z-0 min-w-[50vw] md:min-w-fit bg-white p-1 md:p-8 h-screen border-r flex flex-col transition-all',
          {
            'left-0': open,
            '-left-[100vw] md:left-0': !open,
          }
        )}
      >
        <ul className="flex-1">
          {navLinks.map((link) => (
            <li key={link.href} className="p-4">
              <Link
                className="hover:underline"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="md:hidden m-4 flex justify-end">
          <button onClick={() => setOpen(false)}>close</button>
        </div>
      </div>

      <div
        className={clsx(
          'md:hidden fixed mb-4 z-20 bottom-0 w-full flex justify-center',
          { hidden: open }
        )}
      >
        <button
          className="rounded-full bg-white border drop-shadow hover:drop-shadow-md active:drop-shadow-none w-[42px] h-[42px]"
          onClick={() => setOpen(true)}
        >
          menu
        </button>
      </div>
    </nav>
  )
}

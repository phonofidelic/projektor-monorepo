'use client'
import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import OptionsIcon from './OptionsIcon'

type OptionsMenuProps = {
  open: boolean
  onOpen(): void
  onClose(): void
  children: React.ReactNode
}

export function OptionsMenu({
  open,
  onOpen,
  onClose,
  children,
}: OptionsMenuProps) {
  const [clickOrigin, setClickOrigin] = useState(0)
  const [menuHeight, setMenuHeight] = useState(0)
  const menuRef = useRef<HTMLMenuElement | null>(null)

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.getBoundingClientRect().height)
    }
  }, [open])

  return (
    <div
      className="relative h-10"
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (open && event.key === 'Escape') {
          console.log('bla')
          onClose()
        }
      }}
    >
      {open && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 z-20 bg-gray-400/20"
          onClick={(event) => {
            event.preventDefault()
            onClose()
          }}
        />
      )}
      <button
        className="justify-self-center p-auto rounded-full w-10 h-10 hover:bg-gray-300"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault()
          onOpen()
          setClickOrigin(event.currentTarget.getBoundingClientRect().bottom)
        }}
      >
        <OptionsIcon color="text-gray-400" />
      </button>
      {open && (
        <menu
          ref={menuRef}
          className={clsx(
            'absolute whitespace-nowrap bg-white z-20 rounded border border-gray-200 m-1 drop-shadow-md right-0 mr-5 flex flex-col',
            {
              'bottom-10': window.innerHeight - clickOrigin < menuHeight + 40,
              'top-10': window.innerHeight - clickOrigin > menuHeight + 40,
            }
          )}
        >
          {children}
        </menu>
      )}
    </div>
  )
}

type OptionsMenuItemProps = {
  onSelect(): void
  children: React.ReactNode
}

export function OptionsMenuItem({ onSelect, children }: OptionsMenuItemProps) {
  return (
    <button
      className="p-4 hover:bg-gray-100 text-left"
      onClick={(event) => {
        event.preventDefault()
        onSelect()
      }}
    >
      {children}
    </button>
  )
}

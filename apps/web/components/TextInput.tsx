import React from 'react'

type Props = {
  inputId: string
  type: 'text' | 'email' | 'password'
  name: string
  label: string
  autofocus?: boolean
  value?: string
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

export default function TextInput({
  value,
  inputId,
  type,
  name,
  label,
  autofocus,
  onChange,
}: Props) {
  return (
    <div className="w-full relative mt-4">
      <input
        value={value}
        id={inputId}
        name={name}
        type={type}
        autoFocus={autofocus}
        placeholder={label}
        onChange={onChange}
        className="
                border 
                rounded 
                w-full 
                p-2 
                peer 
                outline-gray-400
                placeholder-transparent"
      />
      <label
        htmlFor={inputId}
        className="
                absolute 
                left-2
                -top-4
                p-1
                text-sm 
                text-gray-400 
                peer-focus:text-gray-400 
                bg-white 
                peer-placeholder-shown:top-2
                peer-placeholder-shown:text-base
                peer-placeholder-shown:p-0
                peer-placeholder-shown:text-black
                peer-focus:-top-4
                peer-focus:text-sm
                peer-focus:p-1
                transition-all"
      >
        {label}
      </label>
    </div>
  )
}

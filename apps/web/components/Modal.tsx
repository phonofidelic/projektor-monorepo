'use client'
import { useRouter } from 'next/navigation'

type ModalProps = {
  children: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter()

  return (
    <div
      className="
      fixed
      top-0
      left-0
      w-full 
      h-screen 
      z-10 
      bg-black/40"
      onClick={() => router.back()}
    >
      <div
        className="max-w-xl mx-auto mt-32 p-4 bg-white rounded"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={(event) => {
              event.stopPropagation()
              router.back()
            }}
          >
            Close
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

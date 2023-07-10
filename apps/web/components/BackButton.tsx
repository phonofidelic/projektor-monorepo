'use client'
import { useRouter } from 'next/navigation'
import BackArrowIcon from './icons/BackArrowIcon'

export default function BackButton({ pushUrl }: { pushUrl?: string }) {
  const router = useRouter()

  return (
    <button
      className="flex flex-col justify-center rounded-full w-[42px] h-[42px] border border-gray-200 hover:bg-gray-100"
      onClick={() => (pushUrl ? router.push(pushUrl) : router.back())}
    >
      <div className="m-auto">
        <BackArrowIcon color="fill-gray-700" />
      </div>
    </button>
  )
}

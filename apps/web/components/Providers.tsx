'use client'
import React from 'react'
import { UserProvider } from '@/contexts/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type Props = {
  accessToken: string
  refreshToken: string
  children: React.ReactNode
}

export default function Providers({
  accessToken,
  refreshToken,
  children,
}: Props) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider accessToken={accessToken} refreshToken={refreshToken}>
        {children}
      </UserProvider>
    </QueryClientProvider>
  )
}

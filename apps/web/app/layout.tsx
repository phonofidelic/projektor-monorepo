import { cookies } from 'next/headers'
import Providers from '@/components/Providers'
import './globals.css'

export default async function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value

  return (
    <html lang="en">
      <body className="p-1 md:p-8 bg-white">
        <Providers accessToken={accessToken} refreshToken={refreshToken}>
          {children}
          {authModal}
        </Providers>
      </body>
    </html>
  )
}

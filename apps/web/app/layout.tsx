import { cookies } from 'next/headers'
import { UserProvider } from '../contexts/UserContext'
import './globals.css'

export default async function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')
  const refreshToken = cookieStore.get('refresh_token')

  return (
    <html lang="en">
      <body className="p-1 md:p-8">
        <UserProvider
          accessToken={accessToken?.value}
          refreshToken={refreshToken?.value}
        >
          {children}
          {authModal}
        </UserProvider>
      </body>
    </html>
  )
}

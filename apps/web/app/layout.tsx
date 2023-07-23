import { cookies } from 'next/headers'
import Providers from '@/components/Providers'
import './globals.css'
import Navigation from '@/components/Navigation'

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
      <body className=" bg-white text-gray-700">
        <Providers accessToken={accessToken} refreshToken={refreshToken}>
          <div className="flex">
            <Navigation />
            <main className="p-1 md:p-8 w-full">
              {children}
              {authModal}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}

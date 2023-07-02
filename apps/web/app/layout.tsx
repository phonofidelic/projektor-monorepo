import './globals.css'

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="p-1 md:p-8">
        {children}
        {authModal}
      </body>
    </html>
  )
}

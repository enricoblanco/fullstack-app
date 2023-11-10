import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import NavBar from './components/nav/Navbar'
import Footer from './components/footer/Footer'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { getCurrentUser } from '@/actions/getCurrentUser'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'EnjoyFood',
  description: 'Restaurant App'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      {/* <SessionProvider session={session}> */}
      <body className={`${poppins.className} text-slate-700`}>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </body>
      {/* </SessionProvider> */}
    </html>
  )
}

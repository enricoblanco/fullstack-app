import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import NavBar from './components/nav/Navbar'
import Footer from './components/footer/Footer'
import SessionProvider from '@/utils/SessionProvider'

import { getServerSession } from 'next-auth'

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
  const session = await getServerSession()

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${poppins.className} text-slate-700`}>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </body>
      </SessionProvider>
    </html>
  )
}

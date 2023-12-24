'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const NavBar = () => {
  const { data: session, status } = useSession()

  return (
    <div className="py-4 text-xl bg-gray-100">
      {!session ? (
        <ul className="flex flex-row justify-between mx-9">
          <li className="hover:text-black">
            <Link href={'/register'}>Register</Link>
          </li>
          <li className="hover:text-black">
            <Link href={'/login'}>Login</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-row justify-evenly">
          <li>{session.user?.name}</li>
          <li>{status}</li>
          <li>
            <Link href={'/register'}>{session.user?.email}</Link>
          </li>
          <li>
            <button
              onClick={() => {
                signOut().then(() => {
                  window.location.replace('/')
                })
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default NavBar

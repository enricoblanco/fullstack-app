'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const NavBar = () => {
  const { data: session } = useSession()

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
          <li className="hover:text-black">
            <Link href={'/home'}>Home</Link>
          </li>
          <li className="hover:text-black">
            <Link href={'/users'}>Users</Link>
          </li>
          <li className="hover:text-black">
            <Link href={'/profile'}>Profile</Link>
          </li>
          <li className="hover:text-black">
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

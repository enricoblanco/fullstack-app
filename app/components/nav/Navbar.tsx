'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const { data: session, status } = useSession()

  console.log(session)

  const router = useRouter()
  return (
    <div>
      <ul className="flex flex-row justify-evenly">
        {!session ? (
          <>
            <li>
              <Link href={'/register'}>Register</Link>
            </li>
            <li>
              <Link href={'/login'}>Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>{session.user?.name}</li>
            <li>{status}</li>
            <li>
              <Link href={'/register'}>{session.user?.email}</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut()
                  router.push('/')
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default NavBar

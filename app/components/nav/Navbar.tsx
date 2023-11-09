import Link from 'next/link'

const NavBar = () => {
  return (
    <div>
      <ul className="flex flex-row justify-between">
        <li>
          <Link href={'/register'}>Register</Link>
        </li>
        <li>
          <Link href={'/login'}>Login</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar

'use client'
import { useSession } from 'next-auth/react'
import UpdateInput from '../components/inputs/UpdateInput'

const UserData = () => {
  const { data: status } = useSession()
  return (
    <div className="mt-6">
      <div className="flex flex-col justify-start text-4xl">Profile</div>
      <div className="ml-2 flex flex-col gap-4 mt-6">
        <div className="flex flex-row gap-2">
          <div>Nome:</div>
          <div>{status?.user.name}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div>Email:</div>
          <div>{status?.user.email}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div>Role:</div>
          <div>{status?.user.role}</div>
        </div>
      </div>
      <UpdateInput label="Nome" />
    </div>
  )
}

export default UserData

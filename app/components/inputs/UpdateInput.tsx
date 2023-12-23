'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface UpdateInputProps {
  label: string
}

const UpdateInput: React.FC<UpdateInputProps> = ({ label }) => {
  const [newName, setNewName] = useState('')
  const { update } = useSession()
  return (
    <div className="w-full relative">
      <input
        onChange={e => setNewName(e.target.value)}
        type="text"
        placeholder=""
        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border-2 transition disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label
        className={`absolute cursor-text duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-slate-400'
        }`}
      >
        {label}
      </label>
      <button
        className="bg-slate-400 text-white p-2 rounded-md mt-2"
        onClick={() => update({ name: newName })}
      >
        Update
      </button>
    </div>
  )
}

export default UpdateInput

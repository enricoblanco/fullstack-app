'use client'

// Importe useState e useEffect
import { useState, useEffect } from 'react'
import axios from 'axios'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'

const Users = () => {
  // Inicialize o estado para armazenar os amigos
  const [users, setusers] = useState<User[]>([])

  useEffect(() => {
    // Defina a função dentro do useEffect para poder usar async/await
    const usersReq = async () => {
      try {
        // Realize a requisição e atualize o estado com os amigos
        const response = await axios.get('/api/user')
        setusers(response.data)
      } catch (error) {
        NextResponse.error()
      }
    }

    usersReq()
  }, [])

  return (
    <div className="">
      {/* Renderize os amigos após a requisição */}
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  )
}

export default Users

'use client'

// Importe useState e useEffect
import { useState, useEffect } from 'react'
import axios from 'axios'
import { User } from '@prisma/client'

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
        console.error('Erro ao obter amigos:', error)
      }
    }

    usersReq()
  }, [])

  return (
    <div className="">
      {/* Renderize os amigos após a requisição */}
      {users.map((friend, index) => (
        <div key={index}>{friend.name}</div>
      ))}
    </div>
  )
}

export default Users

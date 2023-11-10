import { User } from '@prisma/client'
import { JWT } from 'next-auth/jwt'

import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  type JWT = USer
}

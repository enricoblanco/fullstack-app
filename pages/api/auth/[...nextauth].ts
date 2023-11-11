import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt'
  },

  providers: [
    GoogleProvider({
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          role: profile.row ? profile.row : 'USER'
        }
      }
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'jsmith@gmail.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid email or password')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid email or password')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid email or password')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },

    async session({ session, token }) {
      //Get user id from database an set on session
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user?.email as string }
      })
      session.user.id = sessionUser?.id as string

      //Set user role on session
      session.user.role = token.role
      return session
    },

    async signIn({ profile, account }): Promise<string | boolean> {
      try {
        if (account?.provider === 'google') {
          const user = await prisma.user.findUnique({
            where: { email: profile?.email }
          })

          if (!user) {
            await prisma.user.create({
              data: {
                email: profile?.email,
                name: profile?.name,
                role: 'USER'
              }
            })
          }
          return true
        }
        return true
      } catch (err) {
        return false
      }
    }
  }
}

export default NextAuth(authOptions)

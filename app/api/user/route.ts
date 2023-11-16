import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import bcrypt from 'bcrypt'

export async function GET() {
  try {
    const users = await prisma.user.findMany()

    if (!users) {
      return NextResponse.json('No users found')
    }

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const { id, name, email, password } = body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        hashedPassword
      }
    })
    if (!user) {
      return NextResponse.json('Error updating user')
    }

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' })
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { id } = body

    const user = await prisma.user.delete({
      where: { id }
    })

    if (!user) {
      return NextResponse.json('User not found')
    }

    return NextResponse.json(
      { user, message: 'User deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', errorDetails: error },
      { status: 500 }
    )
  }
}

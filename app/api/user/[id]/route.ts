import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return NextResponse.next()
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Something went wrong',
        errorDetails: error
      },
      { status: 500 }
    )
  }
}

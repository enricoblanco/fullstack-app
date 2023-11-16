import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params
    const restaurant = await prisma.restaurant.findUnique({
      where: { id }
    })

    if (!restaurant) {
      return NextResponse.next()
    }

    return NextResponse.json(restaurant)
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

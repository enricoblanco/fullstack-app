import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { restaurantID } = await req.json()

    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' })
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantID }
    })

    if (!restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' })
    }

    await prisma.user.update({
      where: { id },
      data: {
        visited: {
          connect: {
            id: restaurantID
          }
        }
      }
    })

    await prisma.restaurant.update({
      where: { id: restaurantID },
      data: {
        visitors: {
          connect: {
            id
          }
        }
      }
    })

    return NextResponse.json({ user, restaurant }, { status: 200 })
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

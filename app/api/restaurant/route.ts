import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, description, image, address } = body

  prisma.user

  const restaurant = await prisma.restaurant.create({
    data: {
      name,
      description,
      image,
      address
    }
  })

  return NextResponse.json(restaurant)
}

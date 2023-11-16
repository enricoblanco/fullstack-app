import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, description, image, address } = body

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        image,
        address
      }
    })

    if (!restaurant) {
      return NextResponse.json('Error creating restaurant')
    }
    return NextResponse.json(restaurant)
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' })
  }
}

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany()

    if (!restaurants) {
      return NextResponse.json('No restaurants found')
    }
    return NextResponse.json(restaurants)
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', errorDetails: error },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()

    const { id, name, description, image, address } = body

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: {
        name,
        description,
        image,
        address
      }
    })
    if (!restaurant) {
      return NextResponse.json('Error updating restaurant')
    }

    return NextResponse.json(restaurant, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', errorDetails: error },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { id } = body

    const usersWithRestaurant = await prisma.user.findMany({
      where: {
        restIDs: {
          has: id
        }
      }
    })

    const updatedUsers = usersWithRestaurant.map(async user => {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          restIDs: {
            set: user.restIDs.filter(restID => restID !== id)
          }
        }
      })
    })

    await Promise.all(updatedUsers)

    const reviewsWithRestaurant = await prisma.review.findMany({
      where: {
        restID: id
      }
    })

    const updatedReviews = reviewsWithRestaurant.map(async review => {
      await prisma.review.delete({
        where: { id: review.id }
      })
    })

    await Promise.all(updatedReviews)

    const restaurant = await prisma.restaurant.delete({
      where: { id }
    })

    if (!restaurant) {
      return NextResponse.json('Error deleting restaurant')
    }

    return NextResponse.json(restaurant, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', errorDetails: error },
      { status: 500 }
    )
  }
}

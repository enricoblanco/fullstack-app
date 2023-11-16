import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { rating, comment, authorID, restID } = body

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        authorID,
        restID
      }
    })

    if (!review) {
      return NextResponse.json('Error creating review')
    }

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restID },
      data: {
        reviews: {
          connect: {
            id: review.id
          }
        }
      }
    })

    if (!updatedRestaurant) {
      return NextResponse.json('Error updating restaurant')
    }

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', errorDetails: error },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({})

    return NextResponse.json(reviews)
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
    const { id, rating, comment } = body

    const review = await prisma.review.update({
      where: { id },
      data: {
        rating,
        comment
      }
    })

    if (!review) {
      return NextResponse.json('Error updating review')
    }

    return NextResponse.json(review, { status: 200 })
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

    const review = await prisma.review.delete({
      where: { id }
    })

    if (!review) {
      return NextResponse.json('Error deleting review')
    }

    return NextResponse.json(review, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', errorDetails: error },
      { status: 500 }
    )
  }
}

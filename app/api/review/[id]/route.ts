import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params
    const review = await prisma.review.findUnique({
      where: { id }
    })

    if (!review) {
      return NextResponse.next()
    }

    return NextResponse.json(review)
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

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const schoolId = session?.user?.schoolId || (await prisma.school.findFirst())?.id

    if (!schoolId) {
      return NextResponse.json([])
    }

    const books = await prisma.book.findMany({
      where: { schoolId },
      orderBy: { title: "asc" },
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching library books:", error)
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const schoolId = session?.user?.schoolId || (await prisma.school.findFirst())?.id

    if (!schoolId) {
      return NextResponse.json({ error: "No school associated" }, { status: 400 })
    }

    const data = await req.json()
    const quantity = parseInt(data.quantity) || 1

    const newBook = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        isbn: data.isbn || `ISBN-${Date.now()}`,
        quantity,
        available: quantity,
        schoolId,
      },
    })

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}

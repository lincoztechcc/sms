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

    const exams = await prisma.exam.findMany({
      where: { schoolId },
      include: {
        results: true,
      },
      orderBy: { date: "asc" },
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error("Error fetching exams:", error)
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
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

    const newExam = await prisma.exam.create({
      data: {
        name: data.name,
        date: new Date(data.date),
        schoolId,
      },
    })

    return NextResponse.json(newExam, { status: 201 })
  } catch (error) {
    console.error("Error creating exam:", error)
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 })
  }
}

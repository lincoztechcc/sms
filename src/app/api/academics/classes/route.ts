import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.schoolId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const classes = await prisma.class.findMany({
      where: { schoolId: session.user.schoolId },
      include: {
        sections: true,
        teacher: true,
      },
      orderBy: { name: "asc" },
    })
    return NextResponse.json(classes)
  } catch (error) {
    console.error("Error fetching classes:", error)
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.schoolId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const newClass = await prisma.class.create({
      data: {
        name: data.name,
        capacity: parseInt(data.capacity) || 30,
        teacherId: data.teacherId || null,
        schoolId: session.user.schoolId,
      },
    })
    return NextResponse.json(newClass, { status: 201 })
  } catch (error) {
    console.error("Error creating class:", error)
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 })
  }
}

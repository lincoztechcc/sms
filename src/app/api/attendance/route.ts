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

    const records = await prisma.attendance.findMany({
      where: { schoolId: session.user.schoolId },
      include: {
        student: {
          select: { name: true, studentId: true }
        },
        teacher: {
          select: { name: true, teacherId: true }
        }
      },
      orderBy: { date: "desc" },
    })
    return NextResponse.json(records)
  } catch (error) {
    console.error("Error fetching attendance:", error)
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user.schoolId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const record = await prisma.attendance.create({
      data: {
        date: new Date(data.date),
        status: data.status,
        type: data.type, // 'STUDENT' or 'TEACHER'
        studentId: data.studentId || null,
        teacherId: data.teacherId || null,
        schoolId: session.user.schoolId,
      },
    })
    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    console.error("Error creating attendance record:", error)
    return NextResponse.json({ error: "Failed to create attendance" }, { status: 500 })
  }
}

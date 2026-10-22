import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const schoolId = session?.user?.schoolId || (await prisma.school.findFirst())?.id

    if (!schoolId) {
      return NextResponse.json({
        student: null,
        attendances: [],
        results: [],
        fees: [],
      })
    }

    // Attempt to match logged in student by email or get demo student
    let student = null
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      if (user) {
        student = await prisma.student.findFirst({
          where: { schoolId, name: user.name || undefined },
          include: {
            attendances: { orderBy: { date: "desc" }, take: 30 },
            results: { include: { exam: true }, orderBy: { createdAt: "desc" } },
            fees: { orderBy: { createdAt: "desc" } },
          },
        })
      }
    }

    if (!student) {
      student = await prisma.student.findFirst({
        where: { schoolId },
        include: {
          attendances: { orderBy: { date: "desc" }, take: 30 },
          results: { include: { exam: true }, orderBy: { createdAt: "desc" } },
          fees: { orderBy: { createdAt: "desc" } },
        },
      })
    }

    return NextResponse.json({
      student,
      attendances: student?.attendances || [],
      results: student?.results || [],
      fees: student?.fees || [],
    })
  } catch (error) {
    console.error("Error fetching student profile:", error)
    return NextResponse.json({ error: "Failed to fetch student profile" }, { status: 500 })
  }
}

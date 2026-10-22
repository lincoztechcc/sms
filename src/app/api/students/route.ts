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

    const students = await prisma.student.findMany({
      where: { schoolId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
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
    const studentCount = await prisma.student.count({ where: { schoolId } })
    const studentId = `STU-${String(studentCount + 1).padStart(3, "0")}`

    const newStudent = await prisma.student.create({
      data: {
        studentId,
        name: data.name,
        grade: data.grade,
        section: data.section || "A",
        rollNo: data.rollNo || String(studentCount + 1),
        parentName: data.parentName || "Parent",
        phone: data.phone || "",
        schoolId,
      },
    })

    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}

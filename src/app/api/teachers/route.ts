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

    const teachers = await prisma.teacher.findMany({
      where: { schoolId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(teachers)
  } catch (error) {
    console.error("Error fetching teachers:", error)
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 })
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
    const teacherCount = await prisma.teacher.count({ where: { schoolId } })
    const teacherId = `TCH-${String(teacherCount + 1).padStart(3, "0")}`

    const newTeacher = await prisma.teacher.create({
      data: {
        teacherId,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        qualification: data.qualification || "B.Ed",
        department: data.department || "General",
        salary: parseFloat(data.salary) || 40000,
        schoolId,
      },
    })

    return NextResponse.json(newTeacher, { status: 201 })
  } catch (error) {
    console.error("Error creating teacher:", error)
    return NextResponse.json({ error: "Failed to create teacher" }, { status: 500 })
  }
}

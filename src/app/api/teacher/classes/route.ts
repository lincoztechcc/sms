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

    const classes = await prisma.class.findMany({
      where: { schoolId },
      include: {
        sections: true,
        teacher: true,
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(classes)
  } catch (error) {
    console.error("Error fetching teacher classes:", error)
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 })
  }
}

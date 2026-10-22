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

    const fees = await prisma.fee.findMany({
      where: { schoolId },
      include: {
        student: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(fees)
  } catch (error) {
    console.error("Error fetching fees:", error)
    return NextResponse.json({ error: "Failed to fetch fees" }, { status: 500 })
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
    const isPaid = data.status === "Paid"

    const newFee = await prisma.fee.create({
      data: {
        studentId: data.studentId,
        amount: parseFloat(data.amount) || 0,
        status: data.status || "Paid",
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
        paidDate: isPaid ? new Date() : null,
        schoolId,
      },
      include: {
        student: true,
      },
    })

    return NextResponse.json(newFee, { status: 201 })
  } catch (error) {
    console.error("Error recording fee:", error)
    return NextResponse.json({ error: "Failed to record fee" }, { status: 500 })
  }
}

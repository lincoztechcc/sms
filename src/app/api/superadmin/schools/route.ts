import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      include: {
        _count: {
          select: {
            students: true,
            teachers: true,
            users: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    const formatted = schools.map((s) => ({
      ...s,
      studentCount: s._count.students,
      teacherCount: s._count.teachers,
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error("Error fetching schools:", error)
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const expiry = new Date()
    expiry.setFullYear(expiry.getFullYear() + 1)

    const licenseKey = `LIC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`

    const school = await prisma.school.create({
      data: {
        name: data.name,
        domain: data.domain || `${data.name.toLowerCase().replace(/\s+/g, "-")}.eduerp.com`,
        plan: data.plan || "YEARLY",
        subscriptionStatus: "ACTIVE",
        licenseKey,
        licenseExpiry: expiry,
      },
    })

    if (data.adminEmail && data.adminPassword) {
      const hashedPassword = await bcrypt.hash(data.adminPassword, 10)
      await prisma.user.create({
        data: {
          name: `${data.name} Admin`,
          email: data.adminEmail.toLowerCase(),
          password: hashedPassword,
          role: "ADMIN",
          schoolId: school.id,
        },
      })
    }

    return NextResponse.json(school, { status: 201 })
  } catch (error) {
    console.error("Error creating school:", error)
    return NextResponse.json({ error: "Failed to create school" }, { status: 500 })
  }
}

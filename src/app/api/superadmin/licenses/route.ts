import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { schoolId, plan } = await req.json()

    const expiry = new Date()
    if (plan === "6_MONTHS") {
      expiry.setMonth(expiry.getMonth() + 6)
    } else if (plan === "YEARLY") {
      expiry.setFullYear(expiry.getFullYear() + 1)
    } else if (plan === "LIFETIME") {
      expiry.setFullYear(expiry.getFullYear() + 50)
    }

    const updated = await prisma.school.update({
      where: { id: schoolId },
      data: {
        plan,
        subscriptionStatus: "ACTIVE",
        licenseExpiry: expiry,
        licenseKey: `LIC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error renewing license:", error)
    return NextResponse.json({ error: "Failed to renew license" }, { status: 500 })
  }
}

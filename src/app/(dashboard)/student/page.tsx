"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar } from "lucide-react"

import { useSession } from "next-auth/react"

export default function StudentDashboard() {
  const { data: session } = useSession()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, {session?.user?.name || "Student"}!</h2>
        <p className="text-muted-foreground">View your academic progress, attendance, and fees.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">95%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

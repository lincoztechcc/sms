"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Loader2, CheckCircle2, XCircle } from "lucide-react"

export default function StudentAttendance() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/student/profile")
        if (res.ok) {
          setData(await res.json())
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">My Attendance</h2>
        <p className="text-muted-foreground">Review your attendance history for the academic year.</p>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Attendance Record
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data || !data.attendances || data.attendances.length === 0 ? (
            <div className="text-center p-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">No attendance records found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.attendances.map((record: any) => (
                <div key={record.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="font-medium text-sm">
                    {new Date(record.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                    record.status === "Present" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                  }`}>
                    {record.status === "Present" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                    {record.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

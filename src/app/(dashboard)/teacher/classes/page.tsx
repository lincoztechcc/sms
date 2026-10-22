"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Loader2 } from "lucide-react"

export default function TeacherClasses() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/teacher/classes")
        if (res.ok) {
          const data = await res.json()
          setClasses(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchClasses()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">My Classes</h2>
        <p className="text-muted-foreground">Classes and sections currently assigned to you.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full h-32 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : classes.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-xl bg-card">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Classes Assigned</h3>
            <p className="text-sm text-muted-foreground">Contact the Principal or Admin to assign classes to your schedule.</p>
          </div>
        ) : (
          classes.map((cls: any) => (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                <CardTitle className="text-lg font-bold">Class {cls.name}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Capacity</span>
                  <span className="text-sm font-semibold">{cls.capacity} Students</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sections</span>
                  <div className="flex gap-1">
                    {cls.sections?.map((sec: any) => (
                      <span key={sec.id} className="text-xs bg-secondary px-2 py-1 rounded-md font-medium">
                        {sec.name}
                      </span>
                    )) || <span className="text-xs text-muted-foreground">None</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

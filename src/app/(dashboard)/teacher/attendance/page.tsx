"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClipboardList, CheckCircle2, XCircle } from "lucide-react"

export default function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("10A")
  
  // Simplified mock data for demo
  const mockStudents = [
    { id: 1, name: "Jane Student", roll: "15", status: "Present" },
    { id: 2, name: "Alex Smith", roll: "16", status: "Absent" },
    { id: 3, name: "Sarah Connor", roll: "17", status: "Present" }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Mark Attendance</h2>
        <p className="text-muted-foreground">Record daily attendance for your assigned classes.</p>
      </div>

      <div className="flex gap-4 items-center">
        <select 
          className="h-10 px-3 py-2 rounded-md border border-input bg-background"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="10A">Class 10 - Section A</option>
          <option value="9B">Class 9 - Section B</option>
        </select>
        <Button>Load Students</Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg">Students List - {selectedClass}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {mockStudents.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    {s.roll}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{s.name}</p>
                    <p className="text-xs text-muted-foreground">Roll No: {s.roll}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={s.status === "Present" ? "default" : "outline"} className={s.status === "Present" ? "bg-emerald-500 hover:bg-emerald-600" : ""}>
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Present
                  </Button>
                  <Button size="sm" variant={s.status === "Absent" ? "destructive" : "outline"}>
                    <XCircle className="h-4 w-4 mr-1" /> Absent
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-primary hover:bg-primary-hover">Save Attendance Record</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

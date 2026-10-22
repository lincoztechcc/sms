"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart3 } from "lucide-react"

export default function TeacherExams() {
  const mockStudents = [
    { id: 1, name: "Jane Student", roll: "15", marks: "85" },
    { id: 2, name: "Alex Smith", roll: "16", marks: "92" },
    { id: 3, name: "Sarah Connor", roll: "17", marks: "78" }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Marks Entry</h2>
        <p className="text-muted-foreground">Enter examination marks for your students.</p>
      </div>

      <div className="flex gap-4 items-center">
        <select className="h-10 px-3 py-2 rounded-md border border-input bg-background">
          <option>Mid Term Examination</option>
          <option>Final Examination</option>
        </select>
        <select className="h-10 px-3 py-2 rounded-md border border-input bg-background">
          <option>Class 10 - Section A</option>
        </select>
        <Button>Load Sheet</Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Grading Sheet
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {mockStudents.map((s) => (
              <div key={s.id} className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg border bg-secondary/10">
                <div className="col-span-1 flex justify-center">
                  <span className="text-sm font-bold text-muted-foreground">{s.roll}</span>
                </div>
                <div className="col-span-5">
                  <p className="text-sm font-semibold">{s.name}</p>
                </div>
                <div className="col-span-6 flex items-center gap-3 justify-end">
                  <label className="text-xs font-medium text-muted-foreground">Score (/100):</label>
                  <Input type="number" defaultValue={s.marks} className="w-24 h-9 text-right" />
                  <span className="text-sm font-bold w-8 text-center">
                    {parseInt(s.marks) >= 90 ? 'A+' : parseInt(s.marks) >= 80 ? 'A' : 'B'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="bg-primary">Submit Final Grades</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

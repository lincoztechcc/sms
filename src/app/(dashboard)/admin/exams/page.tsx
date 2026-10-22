"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, CalendarDays, Loader2 } from "lucide-react"
import ScheduleExamForm from "@/components/forms/ScheduleExamForm"

interface Exam {
  id: string
  name: string
  date: string
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/exams")
      if (res.ok) {
        const data = await res.json()
        setExams(data)
      }
    } catch (error) {
      console.error("Failed to fetch exams", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Exams & Results</h2>
          <p className="text-muted-foreground">Manage exam schedules, grading, and report cards.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-primary hover:bg-primary-hover text-white">
            <Plus className="h-4 w-4" />
            Schedule Exam
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Upcoming Exams</h3>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search exam..."
              className="pl-9 h-9"
            />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam Name</TableHead>
              <TableHead>Date scheduled</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : exams.length > 0 ? (
              exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-semibold text-foreground">{exam.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {new Date(exam.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      Scheduled
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Enter Marks</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No exams scheduled yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showAddForm && (
        <ScheduleExamForm 
          onCancel={() => setShowAddForm(false)} 
          onSuccess={() => {
            setShowAddForm(false)
            fetchExams()
          }} 
        />
      )}
    </div>
  )
}

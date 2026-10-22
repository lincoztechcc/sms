"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react"
import MarkAttendanceForm from "@/components/forms/MarkAttendanceForm"

interface AttendanceRecord {
  id: string
  date: string
  status: string
  type: string
  student: { name: string, studentId: string } | null
  teacher: { name: string, teacherId: string } | null
}

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchAttendance()
  }, [])

  const fetchAttendance = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/attendance")
      if (res.ok) {
        const data = await res.json()
        setRecords(data)
      }
    } catch (error) {
      console.error("Failed to fetch attendance", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Attendance</h2>
          <p className="text-muted-foreground">Track daily attendance for students and teachers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-primary hover:bg-primary-hover text-white">
            <Plus className="h-4 w-4" />
            Mark Attendance
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Present Today</h3>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold mt-2">94%</div>
          <p className="text-xs text-muted-foreground mt-1">Overall school attendance</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Absent Today</h3>
            <XCircle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold mt-2">42</div>
          <p className="text-xs text-muted-foreground mt-1">Students & Teachers</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Late Arrivals</h3>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold mt-2">15</div>
          <p className="text-xs text-muted-foreground mt-1">Recorded this morning</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Records</h3>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : records.length > 0 ? (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {record.type === 'STUDENT' ? record.student?.name : record.teacher?.name}
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {record.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'Present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                      record.status === 'Absent' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {record.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showAddForm && (
        <MarkAttendanceForm 
          onCancel={() => setShowAddForm(false)} 
          onSuccess={() => {
            setShowAddForm(false)
            fetchAttendance()
          }} 
        />
      )}
    </div>
  )
}

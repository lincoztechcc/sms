"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Loader2 } from "lucide-react"

interface MarkAttendanceFormProps {
  onCancel: () => void
  onSuccess: () => void
}

interface OptionUser {
  id: string
  name: string
  identifier?: string
}

export default function MarkAttendanceForm({ onCancel, onSuccess }: MarkAttendanceFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [type, setType] = useState<"STUDENT" | "TEACHER">("STUDENT")
  const [students, setStudents] = useState<OptionUser[]>([])
  const [teachers, setTeachers] = useState<OptionUser[]>([])
  const [selectedId, setSelectedId] = useState("")
  const [status, setStatus] = useState("Present")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    fetch("/api/students")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setStudents(data))
      .catch(() => {})

    fetch("/api/teachers")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setTeachers(data))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload = {
        date: new Date(date).toISOString(),
        status,
        type,
        studentId: type === "STUDENT" ? selectedId : null,
        teacherId: type === "TEACHER" ? selectedId : null,
      }

      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to mark attendance")
      }

      onSuccess()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const list = type === "STUDENT" ? students : teachers

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Mark Attendance</h3>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-sm rounded-lg bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Attendance For</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={type === "STUDENT" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setType("STUDENT")
                  setSelectedId("")
                }}
              >
                Students
              </Button>
              <Button
                type="button"
                variant={type === "TEACHER" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setType("TEACHER")
                  setSelectedId("")
                }}
              >
                Faculty / Teachers
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Select {type === "STUDENT" ? "Student" : "Teacher"} *
            </label>
            <select
              required
              className="flex h-9 w-full rounded-md border border-border bg-card px-3 py-1 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Choose person...</option>
              {list.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Status</label>
              <select
                className="flex h-9 w-full rounded-md border border-border bg-card px-3 py-1 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Date</label>
              <Input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Attendance
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

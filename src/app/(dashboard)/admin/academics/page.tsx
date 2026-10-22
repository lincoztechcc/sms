"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, MoreHorizontal, Loader2 } from "lucide-react"
import AddClassForm from "@/components/forms/AddClassForm"

interface ClassData {
  id: string
  name: string
  capacity: number
  sections: any[]
  teacher: { name: string } | null
}

export default function AcademicsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classes, setClasses] = useState<ClassData[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/academics/classes")
      if (res.ok) {
        const data = await res.json()
        setClasses(data)
      }
    } catch (error) {
      console.error("Failed to fetch classes", error)
    } finally {
      setLoading(false)
    }
  }
  
  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Academics</h2>
          <p className="text-muted-foreground">Manage classes, sections, and subjects.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-primary hover:bg-primary-hover text-white">
            <Plus className="h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by class name..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Sections Count</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-semibold text-primary">{cls.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {cls.sections?.length || 0} Sections
                    </span>
                  </TableCell>
                  <TableCell>{cls.teacher ? cls.teacher.name : <span className="text-muted-foreground italic">Not Assigned</span>}</TableCell>
                  <TableCell>{cls.capacity} Students</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No classes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showAddForm && (
        <AddClassForm 
          onCancel={() => setShowAddForm(false)} 
          onSuccess={() => {
            setShowAddForm(false)
            fetchClasses()
          }} 
        />
      )}
    </div>
  )
}

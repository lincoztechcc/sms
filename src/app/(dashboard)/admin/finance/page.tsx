"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, MoreHorizontal, Loader2, DollarSign } from "lucide-react"
import CollectFeeForm from "@/components/forms/CollectFeeForm"

interface Fee {
  id: string
  amount: number
  status: string
  dueDate: string
  student: { name: string, studentId: string }
}

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [fees, setFees] = useState<Fee[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchFees()
  }, [])

  const fetchFees = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/finance/fees")
      if (res.ok) {
        const data = await res.json()
        setFees(data)
      }
    } catch (error) {
      console.error("Failed to fetch fees", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Finance & Fees</h2>
          <p className="text-muted-foreground">Manage student fee collections and school expenses.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-primary hover:bg-primary-hover text-white">
            <Plus className="h-4 w-4" />
            Collect Fee
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold mt-2">$45,231.00</div>
          <p className="text-xs text-muted-foreground mt-1">+20% from last month</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Pending Fees</h3>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold mt-2">$12,050.00</div>
          <p className="text-xs text-muted-foreground mt-1">From 45 students</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
            <DollarSign className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold mt-2">$8,400.00</div>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Fee Collections</h3>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search student..."
              className="pl-9 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
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
            ) : fees.length > 0 ? (
              fees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>
                    <div className="font-medium text-foreground">{fee.student?.name || "Unknown"}</div>
                    <div className="text-xs text-muted-foreground">{fee.student?.studentId || ""}</div>
                  </TableCell>
                  <TableCell className="font-semibold">${fee.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      fee.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {fee.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Invoice</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No fee records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showAddForm && (
        <CollectFeeForm 
          onCancel={() => setShowAddForm(false)} 
          onSuccess={() => {
            setShowAddForm(false)
            fetchFees()
          }} 
        />
      )}
    </div>
  )
}

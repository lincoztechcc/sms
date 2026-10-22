"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Loader2 } from "lucide-react"

export default function StudentResults() {
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
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Exam Results</h2>
        <p className="text-muted-foreground">Your academic performance and report cards.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {loading ? (
          <div className="col-span-full h-32 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !data || !data.results || data.results.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-xl bg-card">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">No exam results published yet.</p>
          </div>
        ) : (
          data.results.map((result: any) => (
            <Card key={result.id} className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader className="bg-secondary/30 pb-3">
                <CardTitle className="text-lg">{result.exam?.name || "Examination"}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Date: {result.exam?.date ? new Date(result.exam.date).toLocaleDateString() : 'N/A'}
                </p>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Score Obtained</p>
                    <p className="text-3xl font-bold text-foreground">
                      {result.marks} <span className="text-lg font-normal text-muted-foreground">/ {result.total}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Grade</p>
                    <span className="text-2xl font-bold text-primary">{result.grade}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(result.marks / result.total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    {((result.marks / result.total) * 100).toFixed(1)}% Percentage
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Loader2, IndianRupee } from "lucide-react"

export default function StudentFees() {
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
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Fee Vouchers</h2>
        <p className="text-muted-foreground">View your fee history and pending dues.</p>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Financial Record
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="h-32 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data || !data.fees || data.fees.length === 0 ? (
            <div className="text-center p-8">
              <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">No fee records found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.fees.map((fee: any) => (
                <div key={fee.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border bg-card hover:bg-secondary/20 transition-colors">
                  <div className="mb-2 md:mb-0">
                    <p className="font-semibold text-lg flex items-center">
                      <IndianRupee className="h-4 w-4 mr-1" />{fee.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Due Date: {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      fee.status === "Paid" ? "bg-emerald-100 text-emerald-700" : 
                      fee.status === "Partial" ? "bg-orange-100 text-orange-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      {fee.status.toUpperCase()}
                    </span>
                    {fee.status !== "Paid" && (
                      <button className="text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md font-medium transition-colors">
                        Pay Now
                      </button>
                    )}
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

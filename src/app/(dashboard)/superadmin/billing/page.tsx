"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, History, ShieldAlert, CheckCircle2, Loader2, IndianRupee } from "lucide-react"

export default function BillingDashboard() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [renewingId, setRenewingId] = useState<string | null>(null)

  const fetchSchools = async () => {
    try {
      const res = await fetch("/api/superadmin/schools")
      const data = await res.json()
      setSchools(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchools()
  }, [])

  const handleRenew = async (schoolId: string, plan: string) => {
    setRenewingId(schoolId)
    try {
      const res = await fetch("/api/superadmin/licenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId, plan })
      })
      if (res.ok) {
        fetchSchools()
      } else {
        alert("Failed to renew license")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setRenewingId(null)
    }
  }

  const getPlanPrice = (plan: string) => {
    if (plan === "6_MONTHS") return 6000
    if (plan === "YEARLY") return 10000
    if (plan === "LIFETIME") return 50000
    return 0
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Subscriptions & Billing</h2>
        <p className="text-muted-foreground">Monitor tenant subscriptions and manage license renewals.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full h-32 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : schools.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-xl bg-card">
            <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Subscriptions Found</h3>
          </div>
        ) : (
          schools.map((school: any) => {
            const isExpired = new Date(school.licenseExpiry) < new Date()
            
            return (
              <Card key={school.id} className={`border-t-4 ${isExpired ? 'border-t-rose-500' : 'border-t-emerald-500'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold">{school.name}</CardTitle>
                    {isExpired ? (
                      <ShieldAlert className="h-5 w-5 text-rose-500" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{school.domain || "No Domain"}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm font-medium">Current Plan</span>
                    <span className="text-sm font-bold bg-secondary px-2 py-1 rounded">{school.plan.replace("_", " ")}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm font-medium">Lifetime Value</span>
                    <span className="text-sm font-bold flex items-center text-emerald-600">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {getPlanPrice(school.plan).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm font-medium">Status</span>
                    {isExpired ? (
                      <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-1 rounded-full">EXPIRED</span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">ACTIVE</span>
                    )}
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <History className="h-3 w-3" /> 
                      Expires: {school.licenseExpiry ? new Date(school.licenseExpiry).toLocaleDateString() : 'N/A'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        disabled={renewingId === school.id}
                        onClick={() => handleRenew(school.id, "6_MONTHS")}
                        className="text-xs"
                      >
                        {renewingId === school.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Renew 6M"}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="default"
                        disabled={renewingId === school.id}
                        onClick={() => handleRenew(school.id, "YEARLY")}
                        className="text-xs"
                      >
                        {renewingId === school.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Renew 1Y"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

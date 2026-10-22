"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, IndianRupee, Activity, Loader2 } from "lucide-react"

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalSchools: 0,
    totalUsers: 0,
    activeLicenses: 0,
    estimatedRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/superadmin/schools")
        const schools = await res.json()
        
        let users = 0
        let active = 0
        let revenue = 0

        schools.forEach((s: any) => {
          users += s._count?.users || 0
          if (s.subscriptionStatus === "ACTIVE" && new Date(s.licenseExpiry) > new Date()) {
            active++
          }
          
          if (s.plan === "6_MONTHS") revenue += 6000
          if (s.plan === "YEARLY") revenue += 10000
          if (s.plan === "LIFETIME") revenue += 50000
        })

        setStats({
          totalSchools: schools.length,
          totalUsers: users,
          activeLicenses: active,
          estimatedRevenue: revenue
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">SaaS Overview</h2>
        <p className="text-muted-foreground">Monitor your subscription revenue and active tenant schools.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">₹{stats.estimatedRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Lifetime generated</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeLicenses}</div>
            <p className="text-xs text-muted-foreground mt-1">Schools with valid keys</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalSchools}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered tenants</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Users</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all schools</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Visual placeholder for future charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <Card className="h-64 flex flex-col items-center justify-center bg-secondary/20 border-dashed">
          <Activity className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
          <p className="text-sm font-medium text-muted-foreground">Subscription Growth Chart (Coming Soon)</p>
        </Card>
        <Card className="h-64 flex flex-col items-center justify-center bg-secondary/20 border-dashed">
          <IndianRupee className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
          <p className="text-sm font-medium text-muted-foreground">Revenue Over Time (Coming Soon)</p>
        </Card>
      </div>
    </div>
  )
}

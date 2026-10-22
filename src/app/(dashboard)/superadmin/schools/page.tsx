"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Plus, Key, CalendarClock, ShieldCheck, Loader2 } from "lucide-react"

export default function SchoolsManagement() {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSchool, setEditingSchool] = useState<any>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    plan: "6_MONTHS",
    adminEmail: "",
    adminPassword: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/superadmin/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setShowAddModal(false)
        fetchSchools()
      } else {
        alert("Failed to create school")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/superadmin/schools/${editingSchool.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingSchool.name, logo: editingSchool.logo })
      })
      if (res.ok) {
        setEditingSchool(null)
        fetchSchools()
      } else {
        alert("Failed to update branding")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Schools & Tenants</h2>
          <p className="text-muted-foreground">Manage your SaaS subscribers and their license keys.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-primary hover:bg-primary-hover">
          <Plus className="mr-2 h-4 w-4" /> Add New School
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="h-32 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : schools.length === 0 ? (
          <div className="text-center p-8 border rounded-xl bg-card">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No schools found</h3>
            <p className="text-sm text-muted-foreground">Add your first subscribing school to generate a license key.</p>
          </div>
        ) : (
          schools.map((school: any) => (
            <Card key={school.id} className="overflow-hidden border-border transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row border-l-4 border-primary">
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{school.name}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      school.subscriptionStatus === "ACTIVE" 
                        ? new Date(school.licenseExpiry) < new Date() 
                          ? "bg-rose-100 text-rose-700" // Expired
                          : "bg-emerald-100 text-emerald-700" // Active
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {new Date(school.licenseExpiry) < new Date() ? "EXPIRED" : school.subscriptionStatus}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Plan</p>
                      <p className="text-sm font-semibold">{school.plan.replace("_", " ")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Domain</p>
                      <p className="text-sm font-medium">{school.domain || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Users</p>
                      <p className="text-sm font-medium">{school._count?.users || 0} Total</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Created</p>
                      <p className="text-sm font-medium">{new Date(school.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-3 flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 flex-1">
                      <Key className="h-4 w-4 text-primary" />
                      <code className="text-xs font-mono bg-background px-2 py-1 rounded border">
                        {school.licenseKey || "NO-KEY-GENERATED"}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium">
                        Expires: {school.licenseExpiry ? new Date(school.licenseExpiry).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {school.logo ? (
                        <img src={school.logo} alt="Logo" className="h-6 w-6 rounded object-cover" />
                      ) : (
                        <div className="h-6 w-6 bg-secondary rounded flex items-center justify-center text-xs">No</div>
                      )}
                      <span className="text-xs text-muted-foreground">Custom Logo</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setEditingSchool(school)} className="h-8 text-xs">
                      Edit Branding
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-secondary/30">
              <h3 className="font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Provision New Tenant
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">School / Institute Name</label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Springfield High" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Unique Subdomain (Optional)</label>
                <Input value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} placeholder="springfield.eduerp.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subscription Plan</label>
                <select 
                  className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  value={formData.plan}
                  onChange={e => setFormData({...formData, plan: e.target.value})}
                >
                  <option value="6_MONTHS">6 Months (₹6,000)</option>
                  <option value="YEARLY">Yearly (₹10,000)</option>
                  <option value="LIFETIME">Lifetime (₹50,000)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">School Admin Account Details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Admin Email</label>
                    <Input type="email" required value={formData.adminEmail} onChange={e => setFormData({...formData, adminEmail: e.target.value})} placeholder="admin@school.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Temporary Password</label>
                    <Input type="password" required value={formData.adminPassword} onChange={e => setFormData({...formData, adminPassword: e.target.value})} placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Provisioning..." : "Generate License & Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingSchool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-secondary/30">
              <h3 className="font-bold">Edit School Branding</h3>
              <button onClick={() => setEditingSchool(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">School Name</label>
                <Input required value={editingSchool.name} onChange={e => setEditingSchool({...editingSchool, name: e.target.value})} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo URL (Optional)</label>
                <Input 
                  value={editingSchool.logo || ""} 
                  onChange={e => setEditingSchool({...editingSchool, logo: e.target.value})} 
                  placeholder="https://example.com/logo.png" 
                />
                <p className="text-xs text-muted-foreground mt-1">Paste a direct image link. This will override the default icon.</p>
              </div>

              {editingSchool.logo && (
                <div className="mt-4 p-4 border rounded-lg bg-secondary/20 flex items-center justify-center">
                  <img src={editingSchool.logo} alt="Preview" className="h-16 w-16 object-contain rounded" />
                </div>
              )}

              <div className="pt-6 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setEditingSchool(null)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Branding"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

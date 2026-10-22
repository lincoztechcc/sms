"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, GraduationCap, Bell, Lock, Save, Globe, Mail } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your school profile, academic year, and system preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "general" 
                ? "bg-primary text-white shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Building2 className="h-4 w-4" />
            School Profile
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "academic" 
                ? "bg-primary text-white shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <GraduationCap className="h-4 w-4" />
            Academic Settings
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "notifications" 
                ? "bg-primary text-white shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Bell className="h-4 w-4" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "security" 
                ? "bg-primary text-white shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Lock className="h-4 w-4" />
            Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            
            {activeTab === "general" && (
              <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">School Profile</h3>
                  <p className="text-sm text-muted-foreground">Update your institution's core details and branding.</p>
                </div>
                
                <div className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">School Name</label>
                    <Input defaultValue="EduERP International School" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Registration Number</label>
                      <Input defaultValue="REG-2023-994" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Founded Year</label>
                      <Input defaultValue="1995" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Address</label>
                    <Input defaultValue="123 Education Lane, Knowledge City, NY 10001" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" defaultValue="contact@eduerp.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Website</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" defaultValue="https://eduerp.com" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Academic Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure the current academic year and grading system.</p>
                </div>
                
                <div className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Current Academic Year</label>
                    <select defaultValue="2024 - 2025" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <option>2023 - 2024</option>
                      <option>2024 - 2025</option>
                      <option>2025 - 2026</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Term Structure</label>
                    <select defaultValue="Semesters (2 per year)" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <option>Semesters (2 per year)</option>
                      <option>Trimesters (3 per year)</option>
                      <option>Quarters (4 per year)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Grading System</label>
                    <select defaultValue="GPA (4.0 Scale)" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      <option>GPA (4.0 Scale)</option>
                      <option>Percentage (0-100%)</option>
                      <option>Letter Grades (A-F)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                  <p className="text-sm text-muted-foreground">Manage automated emails and SMS alerts.</p>
                </div>
                
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                    <div>
                      <h4 className="font-medium text-foreground">Fee Reminders</h4>
                      <p className="text-sm text-muted-foreground">Send automated SMS to parents 3 days before due date.</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                      <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                    <div>
                      <h4 className="font-medium text-foreground">Attendance Alerts</h4>
                      <p className="text-sm text-muted-foreground">Notify parents immediately if student is marked absent.</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                      <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background">
                    <div>
                      <h4 className="font-medium text-foreground">Exam Results</h4>
                      <p className="text-sm text-muted-foreground">Automatically publish results to student portals.</p>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700">
                      <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Security</h3>
                  <p className="text-sm text-muted-foreground">Manage your admin password and security preferences.</p>
                </div>
                
                <div className="space-y-4 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Current Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">New Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Confirm Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-2">Update Password</Button>
                </div>
              </div>
            )}

            <div className="p-6 border-t border-border bg-secondary/30 flex justify-end">
              <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover text-white gap-2" disabled={loading}>
                {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Save className="h-4 w-4" />}
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

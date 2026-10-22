"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  Award,
  DollarSign,
  BookOpen,
  Settings,
  Building2,
  CreditCard,
  Shield,
  School,
  ChevronRight,
  BookMarked
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  // Determine role based on URL path or session
  const role = React.useMemo(() => {
    if (pathname.startsWith("/superadmin")) return "SUPERADMIN"
    if (pathname.startsWith("/admin")) return "ADMIN"
    if (pathname.startsWith("/principal")) return "PRINCIPAL"
    if (pathname.startsWith("/teacher")) return "TEACHER"
    if (pathname.startsWith("/student")) return "STUDENT"
    return session?.user?.role || "ADMIN"
  }, [pathname, session])

  const navItems = React.useMemo(() => {
    switch (role) {
      case "SUPERADMIN":
        return [
          { name: "Overview", href: "/superadmin", icon: LayoutDashboard },
          { name: "Schools", href: "/superadmin/schools", icon: Building2 },
          { name: "Billing & Plans", href: "/superadmin/billing", icon: CreditCard },
        ]
      case "PRINCIPAL":
        return [
          { name: "Principal Hub", href: "/principal", icon: LayoutDashboard },
          { name: "Academics", href: "/admin/academics", icon: GraduationCap },
          { name: "Teachers", href: "/admin/teachers", icon: Users },
          { name: "Students", href: "/admin/students", icon: Users },
          { name: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
          { name: "Examinations", href: "/admin/exams", icon: Award },
        ]
      case "TEACHER":
        return [
          { name: "Overview", href: "/teacher", icon: LayoutDashboard },
          { name: "My Classes", href: "/teacher/classes", icon: School },
          { name: "Attendance", href: "/teacher/attendance", icon: CalendarCheck },
          { name: "Exams & Marks", href: "/teacher/exams", icon: Award },
        ]
      case "STUDENT":
        return [
          { name: "Student Portal", href: "/student", icon: LayoutDashboard },
          { name: "My Attendance", href: "/student/attendance", icon: CalendarCheck },
          { name: "Exam Results", href: "/student/results", icon: Award },
          { name: "Fee Status", href: "/student/fees", icon: DollarSign },
          { name: "Library", href: "/student/library", icon: BookMarked },
        ]
      case "ADMIN":
      default:
        return [
          { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
          { name: "Academics", href: "/admin/academics", icon: GraduationCap },
          { name: "Students", href: "/admin/students", icon: Users },
          { name: "Teachers", href: "/admin/teachers", icon: Users },
          { name: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
          { name: "Examinations", href: "/admin/exams", icon: Award },
          { name: "Finance & Fees", href: "/admin/finance", icon: DollarSign },
          { name: "Library", href: "/admin/library", icon: BookOpen },
          { name: "School Settings", href: "/admin/settings", icon: Settings },
        ]
    }
  }, [role])

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border gap-3">
        <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-bold text-base text-foreground leading-tight">EduERP</h1>
          <p className="text-xs text-muted-foreground capitalize font-medium">{role.toLowerCase()} Portal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-muted-foreground")} />
              <span className="flex-1">{item.name}</span>
              {isActive && <ChevronRight className="h-4 w-4 text-white/80" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 text-xs font-bold">
            <Shield className="h-4 w-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-foreground truncate">
              {session?.user?.schoolName || "Lincoz Academy"}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              Active Cloud Multi-Tenant
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

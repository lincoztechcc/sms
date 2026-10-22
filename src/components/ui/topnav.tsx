"use client"

import * as React from "react"
import { useSession, signOut } from "next-auth/react"
import { Bell, LogOut, User, School, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TopNav() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <School className="h-4 w-4 text-indigo-500" />
          <span>{session?.user?.schoolName || "Lincoz Central High"}</span>
        </div>
        <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border border-indigo-200 dark:border-indigo-800">
          Academic Year 2026-2027
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600" />
        </Button>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-semibold text-foreground">
              {session?.user?.name || "Admin User"}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-medium">
              {session?.user?.role || "ADMIN"}
            </span>
          </div>

          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 gap-1 text-xs"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

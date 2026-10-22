import Link from "next/link"
import { GraduationCap, ArrowRight, ShieldCheck, Users, BookOpen, DollarSign } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-background to-background text-foreground">
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight">EduERP</span>
            <span className="text-xs text-muted-foreground block -mt-1">Cloud Education Suite</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20 text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" /> Modern Multi-Tenant School ERP
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Streamline School Operations with <span className="text-indigo-600">Simplicity</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete institutional management covering academics, student records, fee collection, staff attendance, library inventory, and multi-branch SaaS controls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-5xl mx-auto pt-6">
          <Link
            href="/admin"
            className="p-6 rounded-2xl border border-border bg-card hover:border-indigo-500 hover:shadow-lg transition group block"
          >
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-4">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg flex items-center justify-between">
              Admin Portal <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Academics, fees, admissions, exams, library, and settings.
            </p>
          </Link>

          <Link
            href="/teacher"
            className="p-6 rounded-2xl border border-border bg-card hover:border-indigo-500 hover:shadow-lg transition group block"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-4">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg flex items-center justify-between">
              Teacher Portal <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Daily classroom attendance, exams, student marks entry.
            </p>
          </Link>

          <Link
            href="/student"
            className="p-6 rounded-2xl border border-border bg-card hover:border-indigo-500 hover:shadow-lg transition group block"
          >
            <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg flex items-center justify-between">
              Student Portal <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Exam report cards, fee receipts, library catalog, and timetable.
            </p>
          </Link>

          <Link
            href="/superadmin"
            className="p-6 rounded-2xl border border-border bg-card hover:border-indigo-500 hover:shadow-lg transition group block"
          >
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mb-4">
              <DollarSign className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg flex items-center justify-between">
              SuperAdmin <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Multi-school licensing, billing plans, and tenant control.
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}

"use client"

import React from 'react'
import { useAuth } from '@/lib/auth/auth-context'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Zap,
  FileText,
  Key,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import ProtectedRoute from '@/components/ProtectedRoute'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Carbon Metrics', href: '/dashboard/carbon-metrics', icon: BarChart3 },
  { name: 'Compliance', href: '/dashboard/compliance', icon: ShieldCheck },
  { name: 'Risk Analysis', href: '/dashboard/risk-analysis', icon: Zap },
  { name: 'Scenario Simulator', href: '/dashboard/scenario-simulator', icon: Zap },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isDemoMode, logOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const pathname = usePathname()

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } transition-all duration-300 border-r bg-card flex flex-col`}
        >
          <div className="p-6 flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
              <div className="h-8 w-8 rounded-lg bg-primary flex-shrink-0" />
              {sidebarOpen && <span className="font-bold text-xl tracking-tight">Veridion</span>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className={`flex items-center gap-3 px-3 py-2 ${!sidebarOpen && 'justify-center'}`}>
              <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0" />
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.displayName || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email || 'demo@iora.com'}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 mt-4 text-destructive hover:text-destructive"
              onClick={logOut}
            >
              <LogOut size={20} />
              {sidebarOpen && <span>Sign Out</span>}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b bg-card flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold">
              {navItems.find(i => i.href === pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
              {isDemoMode && (
                <span className="px-2 py-1 text-xs font-medium rounded bg-primary/10 text-primary border border-primary/20">
                  Demo Mode
                </span>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

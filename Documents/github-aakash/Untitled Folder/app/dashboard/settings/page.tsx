"use client"

import React from 'react'
import { User, Lock, Bell, CreditCard, Save } from 'lucide-react'
import { useAuth } from '@/lib/auth/auth-context'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const { user, isDemoMode } = useAuth()

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <Button className="gap-2" disabled={isDemoMode}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-primary" />
              <h3 className="font-semibold">Profile</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName || 'Jane Doe'}
                  disabled={isDemoMode}
                  className="w-full px-3 py-2 rounded-md border bg-background text-sm disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Work Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || 'jane@company.com'}
                  disabled={isDemoMode}
                  className="w-full px-3 py-2 rounded-md border bg-background text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock size={20} className="text-primary" />
              <h3 className="font-semibold">Security & Notifications</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Weekly Digest</p>
                  <p className="text-xs text-muted-foreground">Receive a summary of emissions and risks every Monday.</p>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 h-4 w-4 bg-primary rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Real-time Risk Alerts</p>
                  <p className="text-xs text-muted-foreground">Instant notification when a risk severity changes to High.</p>
                </div>
                <div className="h-6 w-11 bg-muted rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 h-4 w-4 bg-muted-foreground rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard size={20} className="text-primary" />
              <h3 className="font-semibold">Plan & Billing</h3>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/30">
              <div>
                <p className="text-sm font-medium">Current Plan: <span className="text-primary">Starter</span></p>
                <p className="text-xs text-muted-foreground">Includes 3 users and basic reporting.</p>
              </div>
              <Button variant="outline" size="sm">Upgrade Plan</Button>
            </div>
          </div>
        </div>

        {isDemoMode && (
          <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm flex items-center gap-3">
            <span className="font-bold">Demo Mode:</span>
            Mutating actions (saving settings, changing passwords) are disabled.
          </div>
        )}
      </div>
    </div>
  )
}

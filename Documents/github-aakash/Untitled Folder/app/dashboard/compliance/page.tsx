import React from 'react'
import { MOCK_COMPLIANCE_DATA } from '@/lib/mock-data'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from './layout'

export default function CompliancePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Compliance Tracker</h1>
              <p className="text-muted-foreground">Framework alignment and disclosure requirements.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COMPLIANCE_DATA.map((framework) => (
              <div key={framework.framework} className="p-6 rounded-2xl border bg-card shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{framework.framework}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    framework.status === 'Aligned' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  }`}>
                    {framework.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-medium">{framework.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${framework.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Requirements</p>
                  <div className="space-y-2">
                    {framework.requirements.map((req) => (
                      <div key={req.id} className="flex items-start gap-3 text-sm">
                        <div className={`mt-1 h-4 w-4 rounded-full border flex items-center justify-center ${
                          req.completed ? 'bg-primary border-primary text-white' : 'bg-background border-muted-foreground/30'
                        }`}>
                          {req.completed && <span className="text-[10px]">✓</span>}
                        </div>
                        <span className={req.completed ? 'text-muted-foreground line-through' : 'text-foreground'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

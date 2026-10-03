import React from 'react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Emissions" value="12,450 tCO2e" change="+2.4%" trend="up" />
        <StatCard title="Scope 1" value="4,200 tCO2e" change="-1.2%" trend="down" />
        <StatCard title="Scope 2" value="3,100 tCO2e" change="+0.5%" trend="up" />
        <StatCard title="Scope 3" value="5,150 tCO2e" change="+4.1%" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border bg-card shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Emissions Breakdown</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl">
            Chart Placeholder (Recharts)
          </div>
        </div>
        <div className="p-6 rounded-2xl border bg-card shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="text-sm">
                  <p className="font-medium">Utility Invoice Uploaded</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <span className="text-xs font-medium text-primary">Verified</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, trend }: { title: string, value: string, change: string, trend: 'up' | 'down' }) {
  return (
    <div className="p-6 rounded-2xl border bg-card shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <h4 className="text-2xl font-bold">{value}</h4>
        <span className={`text-xs font-medium ${trend === 'up' ? 'text-destructive' : 'text-primary'}`}>
          {change}
        </span>
      </div>
    </div>
  )
}

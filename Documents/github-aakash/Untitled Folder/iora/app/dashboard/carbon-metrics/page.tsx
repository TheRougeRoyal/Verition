import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { MOCK_CARBON_DATA } from '@/lib/mock-data'
import ProtectedRoute from '@/components/ProtectedRoute'
import DashboardLayout from './layout'

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0']

export default function CarbonMetricsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Carbon Metrics</h1>
              <p className="text-muted-foreground">Detailed emissions breakdown by scope and category.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border bg-background hover:bg-muted transition-colors">Export CSV</button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors">Add Data Point</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl border bg-card shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Emissions by Category</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_CARBON_DATA.breakdown}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="category"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.75rem' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-2xl border bg-card shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Scope Distribution</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Scope 1', value: MOCK_CARBON_DATA.summary.scope1 },
                        { name: 'Scope 2', value: MOCK_CARBON_DATA.summary.scope2 },
                        { name: 'Scope 3', value: MOCK_CARBON_DATA.summary.scope3 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {[0, 1, 2].map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.75rem' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-2">
                {[
                  { name: 'Scope 1', value: MOCK_CARBON_DATA.summary.scope1, color: COLORS[0] },
                  { name: 'Scope 2', value: MOCK_CARBON_DATA.summary.scope2, color: COLORS[1] },
                  { name: 'Scope 3', value: MOCK_CARBON_DATA.summary.scope3, color: COLORS[2] },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-muted-foreground">{s.name}</span>
                    </div>
                    <span className="font-medium">{s.value} tCO2e</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Scope</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Emissions</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Unit</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CARBON_DATA.breakdown.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{row.category}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        row.scope === 1 ? 'bg-blue-100 text-blue-700' :
                        row.scope === 2 ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        Scope {row.scope}
                      </span>
                    </td>
                    <td className="p-4">{row.value}</td>
                    <td className="p-4 text-muted-foreground">{row.unit}</td>
                    <td className="p-4 text-right">
                      <button className="text-xs text-primary hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    )
  }
}

import React from 'react'
import { FileDown, FileText, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ReportsPage() {
  const reports = [
    { id: 'r1', name: 'Annual ESG Report 2023', type: 'Annual', date: '2024-01-15', status: 'Final' },
    { id: 'r2', name: 'Q3 Carbon Disclosure', type: 'Quarterly', date: '2023-10-01', status: 'Draft' },
    { id: 'r3', name: 'Climate Risk Assessment', type: 'Risk', date: '2023-11-20', status: 'Review' },
    { id: 'r4', name: 'Compliance Audit - CSRD', type: 'Compliance', date: '2023-12-05', status: 'Final' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Report Library</h1>
          <p className="text-muted-foreground">Generate and manage your climate disclosure reports.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} /> Generate New Report
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm"
          />
        </div>
        <select className="px-3 py-2 rounded-lg border bg-background text-sm">
          <option>All Types</option>
          <option>Annual</option>
          <option>Quarterly</option>
          <option>Risk</option>
          <option>Compliance</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="p-6 rounded-2xl border bg-card shadow-sm space-y-4 group hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                <FileText className="text-muted-foreground group-hover:text-primary" size={24} />
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                report.status === 'Final' ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {report.status}
              </span>
            </div>
            <div>
              <h3 className="font-bold group-hover:text-primary transition-colors">{report.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{report.type} Report • {report.date}</p>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border bg-background hover:bg-muted transition-colors">
                <FileText size={14} /> View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors">
                <FileDown size={14} /> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

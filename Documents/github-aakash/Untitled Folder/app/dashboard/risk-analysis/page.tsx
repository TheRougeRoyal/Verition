import React from 'react'
import { MOCK_RISK_DATA } from '@/lib/mock-data'

export default function RiskAnalysisPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Climate Risk Register</h1>
          <p className="text-muted-foreground">Physical and transition risk analysis across operations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_RISK_DATA.map((risk) => (
          <div key={risk.name} className="p-6 rounded-2xl border bg-card shadow-sm space-y-4 hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold">{risk.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  risk.type === 'Physical' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {risk.type}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Trend:</span>
                <span className={`text-xs font-medium ${risk.trend === 'increasing' ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {risk.trend}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Severity:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                risk.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {risk.severity}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {risk.impact}
            </p>

            <div className="pt-4 border-t flex justify-end">
              <button className="text-xs font-medium text-primary hover:underline">View Mitigation Plan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

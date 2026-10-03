"use client"

import React, { useState } from 'react'
import { Save, RefreshCcw, TrendingUp, TrendingDown } from 'lucide-react'

export default function ScenarioSimulatorPage() {
  const [scenarioName, setScenarioName] = useState('Base Case 2024')
  const [params, setParams] = useState({
    carbonPrice: 85,
    energyEfficiency: 2,
    supplyChainShift: 10,
    regulatoryPressure: 50,
  })

  const handleSave = () => {
    alert(`Scenario "${scenarioName}" saved locally in demo mode.`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Scenario Simulator</h1>
          <p className="text-muted-foreground">Model the impact of climate variables on your operational costs.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setParams({ carbonPrice: 85, energyEfficiency: 2, supplyChainShift: 10, regulatoryPressure: 50 })}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-background hover:bg-muted transition-colors flex items-center gap-2"
          >
            <RefreshCcw size={14} /> Reset
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-colors flex items-center gap-2"
          >
            <Save size={14} /> Save Scenario
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-6">
            <h3 className="text-lg font-semibold">Scenario Parameters</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Scenario Name</label>
                <input
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border bg-background text-sm"
                />
              </div>

              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">Carbon Price ($/ton)</label>
                    <span className="text-primary font-bold">${params.carbonPrice}</span>
                  </div>
                  <input
                    type="range" min="0" max="300" step="5"
                    value={params.carbonPrice}
                    onChange={(e) => setParams({ ...params, carbonPrice: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">Energy Efficiency Gain (%)</label>
                    <span className="text-primary font-bold">{params.energyEfficiency}%</span>
                  </div>
                  <input
                    type="range" min="0" max="20" step="0.5"
                    value={params.energyEfficiency}
                    onChange={(e) => setParams({ ...params, energyEfficiency: parseFloat(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">Supply Chain Decarbonization (%)</label>
                    <span className="text-primary font-bold">{params.supplyChainShift}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="5"
                    value={params.supplyChainShift}
                    onChange={(e) => setParams({ ...params, supplyChainShift: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">Regulatory Pressure (Index)</label>
                    <span className="text-primary font-bold">{params.regulatoryPressure}</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1"
                    value={params.regulatoryPressure}
                    onChange={(e) => setParams({ ...params, regulatoryPressure: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImpactCard
              label="Annual OpEx Impact"
              value={`$${(params.carbonPrice * 12.5).toFixed(0)}M`}
              trend={params.carbonPrice > 100 ? 'up' : 'down'}
              description="Direct cost of carbon emissions taxes"
            />
            <ImpactCard
              label="Risk Exposure (VaR)"
              value={`$${(params.regulatoryPressure * 2.1).toFixed(1)}M`}
              trend="up"
              description="Estimated value at risk from policy shifts"
            />
          </div>

          <div className="p-6 rounded-2xl border bg-card shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Projected Impact Area</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">Operations</span>
                  <span className={`text-sm font-bold ${params.energyEfficiency > 5 ? 'text-primary' : 'text-destructive'}`}>
                    {params.energyEfficiency > 5 ? 'Reduced' : 'High'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">Supply Chain</span>
                  <span className={`text-sm font-bold ${params.supplyChainShift > 30 ? 'text-primary' : 'text-destructive'}`}>
                    {params.supplyChainShift > 30 ? 'Optimized' : 'At Risk'}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">Market Access</span>
                  <span className={`text-sm font-bold ${params.regulatoryPressure < 60 ? 'text-primary' : 'text-destructive'}`}>
                    {params.regulatoryPressure < 60 ? 'Stable' : 'Constrained'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="text-sm">Capital Cost</span>
                  <span className={`text-sm font-bold ${params.carbonPrice < 120 ? 'text-primary' : 'text-destructive'}`}>
                    {params.carbonPrice < 120 ? 'Favorable' : 'Premium'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImpactCard({ label, value, trend, description }: { label: string, value: string, trend: 'up' | 'down', description: string }) {
  return (
    <div className="p-6 rounded-2xl border bg-card shadow-sm space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <h4 className="text-3xl font-bold">{value}</h4>
        {trend === 'up' ? <TrendingUp className="text-destructive" size={20} /> : <TrendingDown className="text-primary" size={20} />}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

export const MOCK_CARBON_DATA = {
  summary: {
    total: 12450,
    scope1: 4200,
    scope2: 3100,
    scope3: 5150,
    trend: +2.4,
  },
  breakdown: [
    { category: 'Stationary Combustion', scope: 1, value: 1200, unit: 'tCO2e' },
    { category: 'Mobile Combustion', scope: 1, value: 2000, unit: 'tCO2e' },
    { category: 'Fugitive Emissions', scope: 1, value: 500, unit: 'tCO2e' },
    { category: 'Process Emissions', scope: 1, value: 500, unit: 'tCO2e' },
    { category: 'Purchased Electricity', scope: 2, value: 2100, unit: 'tCO2e' },
    { category: 'Purchased Steam', scope: 2, value: 1000, unit: 'tCO2e' },
    { category: 'Business Travel', scope: 3, value: 1500, unit: 'tCO2e' },
    { category: 'Purchased Goods', scope: 3, value: 2000, unit: 'tCO2e' },
    { category: 'Employee Commute', scope: 3, value: 1650, unit: 'tCO2e' },
  ],
  history: [
    { month: 'Jan', value: 1100 },
    { month: 'Feb', value: 1150 },
    { month: 'Mar', value: 1050 },
    { month: 'Apr', value: 1200 },
    { month: 'May', value: 1300 },
    { month: 'Jun', value: 1250 },
  ],
}

export const MOCK_COMPLIANCE_DATA = [
  {
    framework: 'TCFD',
    status: 'Aligned',
    progress: 100,
    requirements: [
      { id: 'tcfd-1', text: 'Governance of climate risks', completed: true },
      { id: 'tcfd-2', text: 'Strategy and risk management', completed: true },
      { id: 'tcfd-3', text: 'Metrics and targets', completed: true },
      { id: 'tcfd-4', text: 'Disclosure of climate-related financial info', completed: true },
    ]
  },
  {
    framework: 'CSRD',
    status: 'In Progress',
    progress: 65,
    requirements: [
      { id: 'csrd-1', text: 'Double materiality assessment', completed: true },
      { id: 'csrd-2', text: 'Environmental impact reporting', completed: true },
      { id: 'csrd-3', text: 'Social impact reporting', completed: false },
      { id: 'csrd-4', text: 'Governance disclosures', completed: false },
    ]
  },
  {
    framework: 'GHG Protocol',
    status: 'Aligned',
    progress: 100,
    requirements: [
      { id: 'ghg-1', text: 'Scope 1 measurement', completed: true },
      { id: 'ghg-2', text: 'Scope 2 measurement', completed: true },
      { id: 'ghg-3', text: 'Scope 3 measurement', completed: true },
    ]
  },
]

export const MOCK_RISK_DATA = [
  {
    name: 'Heat Stress',
    type: 'Physical',
    severity: 'High',
    trend: 'increasing',
    impact: 'Reduced labor productivity, increased cooling costs'
  },
  {
    name: 'Flooding',
    type: 'Physical',
    severity: 'Medium',
    trend: 'stable',
    impact: 'Potential supply chain disruption in SE Asia'
  },
  {
    name: 'Carbon Pricing',
    type: 'Transition',
    severity: 'High',
    trend: 'increasing',
    impact: 'Direct increase in operational costs'
  },
  {
    name: 'Policy & Legal',
    type: 'Transition',
    severity: 'Low',
    trend: 'stable',
    impact: 'Reporting overhead and audit costs'
  },
]

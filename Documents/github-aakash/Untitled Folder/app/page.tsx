import React from 'react'
import { Button } from "@/components/ui/Button"
import { ArrowRight, Play, CheckCircle2, Globe, Building2, TrendingUp, ShieldCheck } from "lucide-react"
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-xl font-bold tracking-tight">Veridion</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#product" className="transition-colors hover:text-primary">Product</a>
            <a href="#methodology" className="transition-colors hover:text-primary">Methodology</a>
            <a href="#pricing" className="transition-colors hover:text-primary">Pricing</a>
            <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Climate reporting for teams doing the work
                </div>
                <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                  Stop rebuilding your <span className="text-primary">climate report</span> every quarter.
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl max-w-2xl">
                  IORA brings emissions data, climate risk, and reporting evidence into one calm workspace, so your team can spend less time chasing spreadsheets and more time making decisions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/demo">
                    <Button size="lg" className="gap-2">
                      <Play className="h-4 w-4 fill-current" />
                      Explore the demo now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg">Sign in</Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  No sales call required to look around.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-transparent p-8 blur-3xl absolute -inset-4 -z-10" />
                <div className="relative rounded-2xl border bg-card p-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-muted-foreground">Dashboard / Overview</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 rounded-lg bg-muted p-4">
                      <div className="h-2 w-12 rounded bg-muted-foreground/20 mb-2" />
                      <div className="h-6 w-24 rounded bg-muted-foreground/40" />
                    </div>
                    <div className="h-32 rounded-lg bg-muted p-4">
                      <div className="h-2 w-12 rounded bg-muted-foreground/20 mb-2" />
                      <div className="h-6 w-24 rounded bg-muted-foreground/40" />
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary mb-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      Evidence attached
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Every reported number has a trail your finance and sustainability teams can review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="product" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Made for the messy middle
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
                The work behind a trustworthy report is rarely tidy.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "A clear emissions picture",
                  desc: "Track Scope 1, 2, and 3 in one place, with the assumptions and activity data still attached.",
                  icon: "📉",
                },
                {
                  title: "Fewer last-minute surprises",
                  desc: "Find gaps and rising risks early, while there is still time to do something about them.",
                  icon: "⚠️",
                },
                {
                  title: "Evidence that travels with the number",
                  desc: "Keep invoices, factors, notes, and approvals together instead of hunting through shared drives.",
                  icon: "📄",
                },
              ].map((f, i) => (
                <div key={i} className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
                  <div className="text-4xl mb-6">{f.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">How it works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From raw utility bills to a board-ready disclosure in three simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Bring your data together", desc: "Connect your ERP, utility accounts, and supply chain data via our pre-built pipelines." },
                { step: "02", title: "See what needs attention", desc: "Our AI flags gaps in reporting and highlights rising physical and transition risks." },
                { step: "03", title: "Share a report you can stand behind", desc: "Export audit-ready disclosures aligned with TCFD, CSRD, and the GHG Protocol." },
              ].map((s, i) => (
                <div key={i} className="relative p-8 rounded-2xl border bg-card">
                  <span className="text-5xl font-bold text-primary/20 absolute top-4 right-4">{s.step}</span>
                  <h3 className="text-xl font-bold mb-4 relative z-10">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Our Methodology</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Rigorous, transparent, and aligned with global standards. Every data point is traceable, every calculation is reproducible.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Data Integration", desc: "500+ data sources, ERP/utility/supply-chain pipelines", icon: "🔌" },
                { title: "AI-Powered Analysis", desc: "ML models filling gaps, emissions factors", icon: "🤖" },
                { title: "Scenario Modeling", desc: "Monte Carlo simulations, board-ready financial framing", icon: "📊" },
                { title: "Assured Outputs", desc: "GHG Protocol / PCAF / ISSB alignment, independently verified", icon: "✅" },
              ].map((m, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card hover:border-primary/30 transition-colors">
                  <div className="text-4xl mb-4">{m.icon}</div>
                  <h3 className="font-bold mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Built for Decision Makers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Whether you're managing a portfolio or a global supply chain, Veridion provides the clarity you need.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Corporations", icon: <Building2 />, desc: "Supply chain emissions, net-zero pathway planning, board-ready reporting." },
                { title: "Investment Funds", icon: <TrendingUp />, desc: "Portfolio carbon footprint, climate VaR analysis, engagement tracking." },
                { title: "Policy Institutions", icon: <Globe />, desc: "Policy impact modeling, cross-jurisdiction analysis, scenario comparisons." },
                { title: "Infrastructure Operators", icon: <ShieldCheck />, desc: "Asset-level risk mapping, adaptation planning, insurance optimization." },
              ].map((p, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-card space-y-4 transition-all hover:shadow-md">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Scalable plans designed to grow with your sustainability maturity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "Starter", price: "Free", features: ["Up to 3 users", "Basic emissions tracking", "Quarterly reporting", "Community support"], cta: "Get Started", popular: false },
                { name: "Growth", price: "$499/mo", features: ["Up to 20 users", "Advanced risk analysis", "Monthly reporting", "Priority support", "API Access"], cta: "Start Free Trial", popular: true },
                { name: "Enterprise", price: "Custom", features: ["Unlimited users", "Custom data pipelines", "Audit-ready assurance", "Dedicated success manager", "SLA Guarantee"], cta: "Contact Sales", popular: false },
              ].map((plan, i) => (
                <div key={i} className={`relative p-8 rounded-2xl border bg-card transition-all ${plan.popular ? 'ring-2 ring-primary scale-105 shadow-xl' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
                  <div className="text-center mb-8">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full py-6">
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto bg-card rounded-3xl border shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 bg-primary text-primary-foreground space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">Let's talk climate.</h2>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Ready to move beyond spreadsheets? Our team is here to help you integrate your data and start reporting with confidence.
                </p>
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Globe size={20} />
                    </div>
                    <span className="text-sm">hello@iora.climate</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Building2 size={20} />
                    </div>
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>
              </div>
              <div className="p-12 space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input type="text" placeholder="Jane Doe" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Email</label>
                    <input type="email" placeholder="jane@company.com" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <input type="text" placeholder="Acme Corp" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea rows={4} placeholder="How can we help you?" className="w-full px-3 py-2 rounded-md border bg-background text-sm" />
                  </div>
                  <Button className="w-full py-6" size="lg">Send Message</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded bg-primary" />
                <span className="text-lg font-bold">Veridion</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Climate reporting for teams doing the work.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><Link href="/product" className="hover:text-primary transition-colors">Product</Link></li>
                <li><Link href="/docs" className="hover:text-primary transition-colors">Docs</Link></li>
                <li><Link href="/api-docs" className="hover:text-primary transition-colors">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Veridion Climate Intelligence. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

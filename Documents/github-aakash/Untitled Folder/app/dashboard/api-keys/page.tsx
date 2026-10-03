import React from 'react'
import { Button } from '@/components/ui/Button'
import { Key, Plus, Trash2, Eye } from 'lucide-react'

export default function ApiKeysPage() {
  const keys = [
    { id: 'k1', name: 'Production Server', preview: 'sk_4a2b••••8f1c', created: '2024-01-10', lastUsed: '2 mins ago' },
    { id: 'k2', name: 'Staging CI', preview: 'sk_9d1e••••2a4b', created: '2024-02-15', lastUsed: '1 day ago' },
    { id: 'k3', name: 'Local Dev', preview: 'sk_c8f2••••7d9e', created: '2024-03-01', lastUsed: 'Never' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">Generate and manage secrets for programmatic access to the Veridion API.</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} /> Create New Key
        </Button>
      </div>

      <div className="p-6 rounded-2xl border bg-primary/5 border-primary/20 space-y-3">
        <div className="flex items-center gap-2 text-primary font-semibold">
          <Key size={18} />
          <span>Security Note</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          API keys are revealed only once upon creation. Store them securely in your environment variables.
          We recommend rotating keys every 90 days.
        </p>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr className="text-left">
              <th className="p-4 font-medium text-muted-foreground">Key Name</th>
              <th className="p-4 font-medium text-muted-foreground">Preview</th>
              <th className="p-4 font-medium text-muted-foreground">Created</th>
              <th className="p-4 font-medium text-muted-foreground">Last Used</th>
              <th className="p-4 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">{key.name}</td>
                <td className="p-4 font-mono text-xs">{key.preview}</td>
                <td className="p-4 text-muted-foreground">{key.created}</td>
                <td className="p-4 text-muted-foreground">{key.lastUsed}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Reveal">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors" title="Revoke">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

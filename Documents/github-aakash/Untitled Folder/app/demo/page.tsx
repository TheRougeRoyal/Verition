"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'

export default function DemoPage() {
  const { startDemo } = useAuth()
  const router = useRouter()

  const handleStartDemo = async () => {
    startDemo()
    router.push('/dashboard')
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Veridion</h1>
        <p className="text-muted-foreground">
          Experience our climate intelligence platform with realistic demo data.
        </p>
        <button
          onClick={handleStartDemo}
          className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          Explore the demo now
        </button>
      </div>
    </div>
  )
}

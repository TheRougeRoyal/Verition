"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthContextType {
  user: AuthUser | null
  isDemoMode: boolean
  loading: boolean
  signIn: (email: string, pass: string) => Promise<void>
  signUp: (email: string, pass: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logOut: () => Promise<void>
  startDemo: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, pass: string) => {
    // Implementation handled by firebase
  }

  const signUp = async (email: string, pass: string) => {
    // Implementation handled by firebase
  }

  const signInWithGoogle = async () => {
    // Implementation handled by firebase
  }

  const logOut = async () => {
    await firebaseSignOut(auth)
    setIsDemoMode(false)
    router.push('/login')
  }

  const startDemo = () => {
    setIsDemoMode(true)
    router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ user, isDemoMode, loading, signIn, signUp, signInWithGoogle, logOut, startDemo }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

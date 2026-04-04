'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Coffee, ArrowRight, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Basic validation
    if (!email || !password) {
      setError("Please fill in both fields.")
      setLoading(false)
      return
    }

    // Role detection based on email mapping (Mock Authentication Logic)
    // Production: This will be returned by the backend POST /api/v1/auth/login
    let assignedRole = 'cashier'
    if (email.toLowerCase().includes('admin')) assignedRole = 'admin'
    else if (email.toLowerCase().includes('kitchen')) assignedRole = 'kitchen'

    // Setting the secure role cookie mapped to the user
    document.cookie = `user_role=${assignedRole}; path=/; max-age=86400`
    
    setTimeout(() => {
      // Routing depends purely on the role decoded from the authentication
      if (assignedRole === 'admin') router.push('/admin/dashboard')
      else if (assignedRole === 'cashier') router.push('/pos')
      else if (assignedRole === 'kitchen') router.push('/kitchen')
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-canvas)' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-light)', width: '100%', maxWidth: '400px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'var(--accent-orange-light)', color: 'var(--accent-orange)', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
            <Coffee size={32} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Sign in to Odoo POS Cafe</p>
        </div>

        {error && (
          <div style={{ background: 'var(--accent-red-light)', color: 'var(--accent-red)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>
              <Mail size={14} /> Email Address
            </label>
            <input 
              name="email"
              type="email" 
              placeholder="e.g. admin@cafe.com" 
              style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--border-default)', fontSize: 14 }} 
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>
              <Lock size={14} /> Password
            </label>
            <input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--border-default)', fontSize: 14 }} 
            />
          </div>

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', background: '#f9fafb', padding: '10px', borderRadius: '8px', marginTop: '8px' }}>
            <strong>Demo tip:</strong> Use <em>admin@</em>, <em>kitchen@</em>, or any other email for <em>cashier</em> routing.
          </div>

          <button 
            type="submit"
            style={{ marginTop: 8, padding: '14px', borderRadius: '10px', border: 'none', background: 'var(--accent-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 700, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span className="spinner" style={{ width: 16, height: 16, border: '2px solid white', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            ) : (
              <>Secure Sign In <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--accent-blue)', fontWeight: 700, textDecoration: 'none' }}>
            Register here
          </Link>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 100% { transform: rotate(360deg); } }
          input:focus { outline: 2px solid var(--accent-blue); }
        `}} />
      </div>
    </div>
  )
}

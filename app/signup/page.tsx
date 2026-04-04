'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Coffee, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Default to Cashier role for new signups
    document.cookie = `user_role=cashier; path=/; max-age=86400`
    
    setTimeout(() => {
      router.push('/pos')
    }, 1200)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-canvas)' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-light)', width: '100%', maxWidth: '400px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ background: 'var(--accent-orange-light)', color: 'var(--accent-orange)', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
            <Coffee size={32} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Join the Team</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Create an employee account</p>
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>Full Name</label>
            <input required type="text" placeholder="John Doe" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--border-default)' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>Email Address</label>
            <input required type="email" placeholder="john@odoocafe.com" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--border-default)' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-secondary)' }}>Password</label>
            <input required type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid var(--border-default)' }} />
          </div>

          <button 
            type="submit"
            style={{ marginTop: 8, padding: '14px', borderRadius: '10px', border: 'none', background: 'var(--accent-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 700, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span className="spinner" style={{ width: 16, height: 16, border: '2px solid white', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            ) : (
              <>Register Account <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--accent-blue)', fontWeight: 700, textDecoration: 'none' }}>
            Log in instead
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

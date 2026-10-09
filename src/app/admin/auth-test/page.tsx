'use client'

import { useState } from 'react'

export default function AdminAuthTest() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [redirect, setRedirect] = useState(false)

  const handleLogin = async () => {
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(`Welcome, ${data.adminName}!`)
        setRedirect(true)
        // Redirect to dashboard after successful login
        window.location.href = '/admin/dashboard'
        console.log('Admin logged in:', data)
      } else {
        setStatus('error')
        setMessage(data.error || 'Login failed')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Connection error. Please try again.')
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Admin Login
        </h2>
        
        {status === 'loading' && (
          <p className="text-center text-muted-foreground">Authenticating...</p>
        )}

        {status === 'success' && !redirect && (
          <div className="mb-4 p-4 bg-green-100/50 rounded text-green-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-100/50 rounded text-red-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}

        {redirect ? (
          // Redirect to dashboard - show brief message then navigate
          <div className="mt-8 text-center">
            <p className="text-green-600 font-medium text-sm">
              Logging in... redirecting to dashboard
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                placeholder="Enter admin email"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
            >
              {status === 'loading' ? 'Logging In...' : 'Sign In as Admin'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
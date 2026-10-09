'use client'

import { useState } from 'react'

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'sales' | 'packaging' | 'customer' | null>(null)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const roles = [
    { label: 'Admin', path: '/admin/dashboard', description: 'Greenhouse management' },
    { label: 'Sales', path: '/sales/login', description: 'Order management' },
    { label: 'Packaging', path: '/packaging/login', description: 'Stock updates' },
    { label: 'Customer', path: '/customer/login', description: 'Browse products' },
  ]

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role as 'admin' | 'sales' | 'packaging' | 'customer')
  }

  const handleLogin = async () => {
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(`Welcome, ${data.adminName}!`)
        // Navigate to dashboard after successful login
        window.location.href = '/admin/dashboard'
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

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-purple-100 p-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-6">GreenHouse Inventory</h1>
          <div className="space-y-4">
            {roles.map((role) => (
              <div
                key={role.label}
                onClick={() => handleRoleSelect(role.label)}
                className="group p-6 rounded-2xl border hover:border-green-600 hover:shadow-lg cursor-pointer"
              >
                <div className="text-3xl font-bold mb-2">{role.label}</div>
                <p className="text-gray-600 line-clamp-2">{role.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">Select your role to begin</p>
          </div>
        </div>
      </div>
    )
  }

  const roleInfo = {
    admin: { title: 'Admin Authentication', subtitle: 'Enter admin credentials', path: '/admin/dashboard' },
    sales: { title: 'Sales Login', subtitle: 'Sales team access', path: '/sales/login' },
    packaging: { title: 'Packaging Login', subtitle: 'Stock update access', path: '/packaging/login' },
    customer: { title: 'Customer Login', subtitle: 'Order placement access', path: '/customer/login' },
  }

  // Safely get role info - use admin as default if selectedRole is unexpected
  const roleData = roleInfo[selectedRole as keyof typeof roleInfo] || roleInfo.admin

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">{roleData.title}</h2>
        <p className="text-gray-600 mb-6 text-center">{roleData.subtitle}</p>
        <div className="space-y-4">
          {selectedRole === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 rounded border focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter admin email"
                required
              />
            </div>
          )}
          {selectedRole === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 rounded border focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
          )}
          {selectedRole !== 'admin' || (selectedRole === 'admin' && status !== 'loading')}
          <button
            onClick={handleLogin}
            disabled={status === 'loading'}
            className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            {status === 'loading' ? 'Logging In...' : 'Sign In'}
          </button>
        </div>
        {selectedRole === 'admin' && status === 'error' && (
          <div className="mb-4 p-4 bg-red-100/50 rounded text-red-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}
        {selectedRole === 'admin' && status === 'success' && (
          <div className="mb-4 p-4 bg-green-100/50 rounded text-green-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={() => setSelectedRole(null)}
            className="text-gray-500 hover:text-green-600 text-sm transition-colors"
          >
            Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  )
}
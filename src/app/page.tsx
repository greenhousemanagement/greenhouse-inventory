'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'sales' | 'packaging' | 'customer' | null>(null)
  const [pin, setPin] = useState('')
  const [showError, setShowError] = useState(false)

  const roles = [
    { label: 'Admin', path: '/admin/auth-test', description: 'Greenhouse management, categories & products' },
    { label: 'Sales', path: '/sales/login', description: 'Order management & sales tracking' },
    { label: 'Packaging', path: '/packaging/login', description: 'Stock updates & inventory management' },
    { label: 'Customer', path: '/customer/login', description: 'Browse products & place orders' },
  ]

  const rolePins = {
    admin: '8899',
    sales: '1234',
    packaging: '5678',
    customer: '9999',
  }

  const roleDestinations = {
    admin: '/admin/dashboard',
    sales: '/sales/orders',
    packaging: '/packaging/stock',
    customer: '/customer/orders',
  }

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role as 'admin' | 'sales' | 'packaging' | 'customer')
  }

  const handleLogin = async () => {
    const expectedPin = rolePins[selectedRole as keyof typeof rolePins]
    if (!pin || pin !== expectedPin) {
      setShowError(true)
      return
    }

    // Redirect to role-specific dashboard
    const destination = roleDestinations[selectedRole as keyof typeof roleDestinations]
    window.location.href = destination
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
                className="group p-6 rounded-2xl border transition-all hover:border-green-600 hover:shadow-lg cursor-pointer"
                style={{ borderColor: selectedRole === role.label ? 'green-600' : 'transparent' }}
              >
                <div className="text-3xl font-bold mb-2" style={{ color: selectedRole === role.label ? 'green-600' : 'purple-600' }}>
                  {role.label}
                </div>
                <p className="text-gray-600 line-clamp-2">{role.description}</p>
                <svg className="w-5 h-5 mt-3 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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

  const roleConfig = {
    label: selectedRole?.charAt(0).toUpperCase() + selectedRole?.slice(1) + ' Login',
    pin: rolePins[selectedRole as keyof typeof rolePins],
    destination: roleDestinations[selectedRole as keyof typeof roleDestinations],
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">{roleConfig.label}</h2>
        
        {showError && (
          <p className="mt-4 text-red-600 text-sm text-center">Invalid PIN. Please try again.</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-3 rounded border focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter PIN"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick=(() => setSelectedRole(null))
            className="text-gray-500 hover:text-green-600 text-sm transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'sales' | 'packaging' | 'customer' | null>(null)

  const roles = [
    { label: 'Admin', path: '/admin/auth-test', description: 'Greenhouse management' },
    { label: 'Sales', path: '/sales/login', description: 'Order management' },
    { label: 'Packaging', path: '/packaging/login', description: 'Stock updates' },
    { label: 'Customer', path: '/customer/login', description: 'Browse products' },
  ]

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role as 'admin' | 'sales' | 'packaging' | 'customer')
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
    admin: { title: 'Admin Authentication', subtitle: 'PIN: 8899', path: '/admin/auth-test' },
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PIN</label>
            <input
              type="password"
              placeholder="Enter PIN"
              className="w-full p-3 rounded border focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => window.location.href = roleData.path}
            className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </div>
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
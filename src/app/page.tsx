'use client'

import { useState } from 'react'

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<'sales' | 'packaging' | 'customer' | null>(null)

  const roles = [
    { label: 'Sales', path: '/sales/login', description: 'Order management' },
    { label: 'Packaging', path: '/packaging/login', description: 'Stock updates' },
    { label: 'Customer', path: '/customer/login', description: 'Browse products' },
  ]

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role as 'sales' | 'packaging' | 'customer')
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Role Selected</h2>
        <p className="text-gray-600 mb-6">You have selected: <span className="text-green-600 font-medium">{selectedRole?.toUpperCase()}</span></p>
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
        <div className="mt-6 text-center">
          <button
            onClick={() => setSelectedRole(null)}
            className="text-gray-500 hover:text-green-600 text-sm transition-colors"
          >
            Choose Different Role
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [sections, setSections] = useState<'categories' | 'products'>('categories')

  const handleLogin = async () => {
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: '8899' }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(`Welcome, ${data.adminName}!`)
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

  // Simple dashboard based on selected section
  const sectionMap: Record<string, string> = {
    categories: 'Categories Management',
    products: 'Products Management',
  }

  const sectionTitle = sections === 'categories'
    ? 'Categories'
    : sections === 'products'
    ? 'Products'
    : 'Dashboard'

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">
          {sectionTitle}
        </h2>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="space-y-4">
          <button
            onClick={() => setSections('categories')}
            className="w-full py-3 bg-green-50 text-green-600 border border-green-500 rounded-xl hover:bg-green-100 transition-colors text-sm font-medium"
          >
            Categories
          </button>
          
          <button
            onClick={() => setSections('products')}
            className="w-full py-3 bg-green-50 text-green-600 border border-green-500 rounded-xl hover:bg-green-100 transition-colors text-sm font-medium"
          >
            Products
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Admin PIN: 8899 | Manage categories and products
          </p>
        </div>
      </div>
    </div>
  )
}
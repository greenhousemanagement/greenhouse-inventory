'use client'

import { useState } from 'react'

export default function CustomerDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4">Loading customer dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Customer Dashboard</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
            <p className="text-gray-500">Browse available stock</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Orders</label>
            <p className="text-gray-500">View order history</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">Place orders and track status</p>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SalesDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  // Simple on mount - just show loading then content
  // In real app, would fetch from /api/admin/products

  // Simple return - just the essentials
  if (loading) {
    return (
      <div className="min-h-screen p-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4">Loading sales dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Sales Dashboard</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
            <p className="text-gray-500">0 products loaded</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Orders</label>
            <p className="text-gray-500">0 orders placed</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">Click home to return</p>
        </div>
      </div>
    </div>
  )
}
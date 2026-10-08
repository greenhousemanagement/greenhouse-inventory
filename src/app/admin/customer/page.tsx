'use client'

import { useState } from 'react'

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setMessage('')

    try {
      // Try to fetch customer data or just show login state
      setLoading(false)
      setMessage('Customer access - browse products and place orders')
    } catch (error) {
      setLoading(false)
      setMessage('Connection error. Please try again.')
      console.error('Customer login error:', error)
    }
  }

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
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Customer Login
        </h2>

        <p className="text-gray-600 mb-6 text-center">{message}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer PIN
            </label>
            <input
              type="password"
              placeholder="Enter customer PIN"
              className="w-full p-3 rounded border focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            Continue as Customer
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            PIN: 9999 (default for testing)
          </p>
        </div>
      </div>
    </div>
  )
}
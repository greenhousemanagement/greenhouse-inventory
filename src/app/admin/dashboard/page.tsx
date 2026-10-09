'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [sections, setSections] = useState<'categories' | 'products'>('categories')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

        {isLoggedIn && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Admin authenticated | Manage categories and products
            </p>
          </div>
        )}

        {!isLoggedIn && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              <a href="/" className="underline text-primary hover:text-primary/90">
                Go to home page to login as admin (admin@greenhouse.com / admin123)
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
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

  const fetchCategories = async () => {
    setStatus('loading')
    try {
      const response = await fetch('/api/admin/categories')
      const data = await response.json()
      if (data.success) {
        setSections('categories')
        setMessage(`Loaded ${data.categories.length} categories`)
      } else {
        setMessage(data.error || 'Failed to load categories')
      }
    } catch (error) {
      setMessage('Error loading categories')
      console.error('Error:', error)
    } finally {
      setStatus('idle')
    }
  }

  const fetchProducts = async () => {
    setStatus('loading')
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      if (data.success) {
        setSections('products')
        setMessage(`Loaded ${data.products.length} products`)
      } else {
        setMessage(data.error || 'Failed to load products')
      }
    } catch (error) {
      setMessage('Error loading products')
      console.error('Error:', error)
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Admin Dashboard
        </h2>
        
        {status === 'loading' && (
          <p className="text-center text-muted-foreground">Authenticating...</p>
        )}

        {status === 'success' && (
          <div className="mb-4 p-4 bg-green-100/50 rounded text-green-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-4 p-4 bg-red-100/50 rounded text-red-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}

        {/* Auth Section */}
        {status === 'idle' && (
          <form onSubmit={handleLogin} className="mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-white mb-2">
                Admin PIN
              </label>
              <input
                type="password"
                value={''}
                onChange={(e) => {}}
                className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                placeholder="Enter admin PIN (8899)"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
            >
              Sign In as Admin
            </button>
          </form>
        )}

        {/* Navigation */}
        {status === 'success' && (
          <div className="mb-6">
            <Link 
              href="/admin/categories" 
              className="mr-4 inline-block py-2 px-4 rounded bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
            >
              Categories Management
            </Link>
            <Link 
              href="/admin/products" 
              className="mr-4 inline-block py-2 px-4 rounded bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Products Management
            </Link>
            <Link 
              href="/"
              className="inline-block py-2 px-4 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}

        {/* Content Area */}
        {status === 'success' && (
          <div>
            {/* Categories Section */}
            {sections === 'categories' && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-primary mb-4">Categories</h3>
                
                {/* Add Category Form */}
                <div className="bg-gray-900/50 rounded p-4 mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">Add New Category</h4>
                  <input
                    type="text"
                    id="new-category-name"
                    placeholder="Category name"
                    className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  />
                  <button
                    onClick={() => fetchCategories()}
                    className="mt-2 py-1 px-3 rounded bg-primary text-white font-medium"
                  >
                    Load Categories
                  </button>
                </div>

                {/* Categories List */}
                <div className="overflow-x-auto rounded border border-white/20">
                  <table className="min-w-full text-sm text-white">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Description</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Categories will be populated here */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Products Section */}
            {sections === 'products' && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-primary mb-4">Products</h3>
                
                {/* Add Product Form */}
                <div className="bg-gray-900/50 rounded p-4 mb-4">
                  <h4 className="text-sm font-medium text-white mb-2">Add New Product</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Product name"
                      className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Category ID"
                      className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="number"
                      placeholder="Box count"
                      className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Items per box"
                      className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Raw rate"
                      className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Seller code"
                      className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Specification"
                    className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Seller contact"
                    className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  />
                  <select
                    className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <button
                    onClick={() => fetchProducts()}
                    className="mt-2 py-1 px-3 rounded bg-primary text-white font-medium"
                  >
                    Load Products
                  </button>
                </div>

                {/* Products List */}
                <div className="overflow-x-auto rounded border border-white/20">
                  <table className="min-w-full text-sm text-white">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Boxes</th>
                        <th className="text-left p-2">Items/Box</th>
                        <th className="text-left p-2">Raw Rate</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Products will be populated here */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
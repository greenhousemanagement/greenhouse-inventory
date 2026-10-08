'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PackagingDashboard() {
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories')
  const [formData, setFormData] = useState({
    category_name: '',
    description: ''
  })
  const [productForm, setProductForm] = useState({
    category_id: '',
    product_name: '',
    box_count: 0,
    items_per_box: 0,
    raw_rate: 0,
    seller_code: '',
    seller_contact: '',
    status: 'active'
  })

  // Fetch categories and products on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catResponse = await fetch('/api/admin/categories')
        const catData = await catResponse.json()
        if (catData.success) {
          setCategories(catData.categories)
        }

        // Fetch products
        const prodResponse = await fetch('/api/admin/products')
        const prodData = await prodResponse.json()
        if (prodData.success) {
          setProducts(prodData.products)
        }
      } catch (error) {
        setMessage('Error loading data')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Switch tab
  const switchTab = (tab: 'categories' | 'products') => {
    setActiveTab(tab)
  }

  // Handle category form submission
  const handleCategorySubmit = async () => {
    if (!formData.category_name.trim()) {
      setMessage('Category name is required')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.category_name, description: formData.description })
      })
      const data = await response.json()
      if (data.success) {
        setMessage('Category added successfully')
        setSuccess(true)
        setFormData({ category_name: '', description: '' })
        fetchData()
      } else {
        setMessage(data.error || 'Failed to add category')
      }
    } catch (error) {
      setMessage('Error saving category')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle product form submission
  const handleProductSubmit = async () => {
    if (!productForm.product_name.trim() || !productForm.category_id) {
      setMessage('Product name and category are required')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productForm.product_name,
          category_id: productForm.category_id,
          box_count: productForm.box_count,
          items_per_box: productForm.items_per_box,
          raw_rate: productForm.raw_rate,
          seller_code: productForm.seller_code,
          seller_contact: productForm.seller_contact,
          status: productForm.status
        })
      })
      const data = await response.json()
      if (data.success) {
        setMessage('Product added successfully')
        setSuccess(true)
        setProductForm({
          category_id: '',
          product_name: '',
          box_count: 0,
          items_per_box: 0,
          raw_rate: 0,
          seller_code: '',
          seller_contact: '',
          status: 'active'
        })
        fetchData()
      } else {
        setMessage(data.error || 'Failed to add product')
      }
    } catch (error) {
      setMessage('Error saving product')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id: string, type: 'category' | 'product') => {
    if (!confirm('Are you sure you want to delete this item?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/${type}?id=${id}`, { method: 'DELETE' })
      const data = await response.json()
      if (data.success) {
        setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`)
        fetchData()
      } else {
        setMessage(data.error || 'Failed to delete')
      }
    } catch (error) {
      setMessage('Error deleting item')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          <p className="text-center text-muted-foreground">Loading packaging dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Packaging Team Dashboard
        </h2>

        {success && (
          <div className="mb-4 p-4 bg-green-100/50 rounded text-green-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}

        {message && message.startsWith('Failed') && (
          <div className="mb-4 p-4 bg-red-100/50 rounded text-red-200 text-center">
            <p className="font-medium">{message}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/admin"
            className="inline-block mr-4 py-2 px-4 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            ← Back to Admin Dashboard
          </Link>
          <Link
            href="/admin/categories"
            className="inline-block py-2 px-4 rounded bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/admin/products"
            className="inline-block py-2 px-4 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Products
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-white/20">
          <button
            onClick={() => switchTab('categories')}
            className={`py-2 px-4 rounded tab-${activeTab === 'categories' ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-primary/10 transition-colors'}`}
          >
            Categories ({categories.length})
          </button>
          <button
            onClick={() => switchTab('products')}
            className={`py-2 px-4 rounded tab-${activeTab === 'products' ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-primary/10 transition-colors'}`}
          >
            Products ({products.length})
          </button>
        </div>

        {/* Current Tab Content */}
        {activeTab === 'categories' && (
          <div className="space-y-4">
            {/* Add Category Form */}
            <div className="bg-gray-900/50 rounded p-4 mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Add New Category</h4>
              <input
                type="text"
                placeholder="Category name"
                value={formData.category_name}
                onChange={(e) =>
                  setFormData({ ...formData, category_name: e.target.value })
                }
                className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
              />
              <button
                onClick={handleCategorySubmit}
                className="mt-2 w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
              >
                Add Category
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
                  {categories.map((cat: any) => (
                    <tr key={cat.id} className="border-b border-white/10 hover:bg-gray-900/20">
                      <td className="p-2 font-medium">{cat.name}</td>
                      <td className="p-2 text-sm text-gray-400">{cat.description || '-'}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDelete(cat.id, 'category')}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {categories.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No categories found. Add one above.
              </p>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Add Product Form */}
            <div className="bg-gray-900/50 rounded p-4 mb-4">
              <h4 className="text-sm font-medium text-white mb-4">
                {success && productForm.product_name ? 'Update Product' : 'Add New Product'}
              </h4>

              {/* Category Select */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-white mb-1">Category</label>
                <select
                  value={productForm.category_id}
                  onChange={(e) =>
                    setProductForm({ ...productForm, category_id: e.target.value })
                  }
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Product name"
                  value={productForm.product_name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, product_name: e.target.value })
                  }
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  required
                />
                <input
                  type="number"
                  value={productForm.box_count}
                  onChange={(e) =>
                    setProductForm({ ...productForm, box_count: Number(e.target.value) })
                  }
                  placeholder="Box count"
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
                <input
                  type="number"
                  value={productForm.items_per_box}
                  onChange={(e) =>
                    setProductForm({ ...productForm, items_per_box: Number(e.target.value) })
                  }
                  placeholder="Items per box"
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
                <input
                  type="number"
                  value={productForm.raw_rate}
                  onChange={(e) =>
                    setProductForm({ ...productForm, raw_rate: Number(e.target.value) })
                  }
                  placeholder="Raw rate"
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
              </div>

              {/* Seller & Status */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={productForm.seller_code}
                  onChange={(e) =>
                    setProductForm({ ...productForm, seller_code: e.target.value })
                  }
                  placeholder="Seller code"
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
                <input
                  type="text"
                  value={productForm.seller_contact}
                  onChange={(e) =>
                    setProductForm({ ...productForm, seller_contact: e.target.value })
                  }
                  placeholder="Seller contact"
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1">Status</label>
                <div className="flex space-x-2">
                  <label className="flex-1 py-1 px-2 rounded border bg-gray-900/30 text-sm">
                    <input
                      type="radio"
                      checked={productForm.status === 'active'}
                      onChange={() => setProductForm({ ...productForm, status: 'active' })}
                      className="rounded border"
                    />
                    Active
                  </label>
                  <label className="flex-1 py-1 px-2 rounded border bg-gray-900/30 text-sm">
                    <input
                      type="radio"
                      checked={productForm.status === 'inactive'}
                      onChange={() => setProductForm({ ...productForm, status: 'inactive' })}
                      className="rounded border"
                    />
                    Inactive
                  </label>
                </div>
              </div>

              <button
                onClick={handleProductSubmit}
                className="w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
              >
                {success && productForm.product_name ? 'Update Product' : 'Add Product'}
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
                    <th className="text-left p-2">Seller Code</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod: any) => (
                    <tr key={prod.id} className="border-b border-white/10 hover:bg-gray-900/20">
                      <td className="p-2 font-medium">{prod.name}</td>
                      <td className="p-2 text-sm text-gray-400">
                        {prod.category?.name || 'No category'}
                      </td>
                      <td className="p-2">{prod.box_count || 0}</td>
                      <td className="p-2">{prod.items_per_box || 0}</td>
                      <td className="p-2">₹{prod.raw_rate || 0}</td>
                      <td className="p-2 text-sm text-gray-400">{prod.seller_code || '-'}</td>
                      <td className="p-2">
                        <span
                          className={`inline-flex items-center px-2 rounded text-xs ${prod.status === 'active' ? 'bg-green-600/30 text-green-200' : 'bg-gray-600/30 text-gray-300'}`}
                        >
                          {prod.status || 'active'}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDelete(prod.id, 'product')}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {products.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No products found. Add one above.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
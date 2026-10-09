'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [editing, setEditing] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [name, setName] = useState('')
  const [category_id, setCategoryId] = useState('')
  const [box_count, setBoxCount] = useState(0)
  const [items_per_box, setItemsPerBox] = useState(0)
  const [raw_rate, setRawRate] = useState(0)
  const [seller_code, setSellerCode] = useState('')
  const [seller_contact, setSellerContact] = useState('')
  const [status, setStatus] = useState('active')
  const [message, setMessage] = useState('')

  // Fetch categories for the select dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        const data = await response.json()
        if (data.success) {
          setCategories(data.categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products')
        const data = await response.json()
        if (data.success) {
          setProducts(data.products)
          setMessage(`Loaded ${data.products.length} products`)
        } else {
          setMessage(data.error || 'Failed to load products')
        }
      } catch (error) {
        setMessage('Error loading products')
        console.error('Error:', error)
      }
    }
    fetchProducts()
  }, [])

  // Add/Update product
  const handleSave = async () => {
    if (!name.trim() || !category_id) {
      setMessage('Product name and category are required')
      return
    }

    try {
      if (currentProduct?.id) {
        // Update existing
        const response = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: currentProduct.id,
            name,
            category_id,
            box_count: box_count || 0,
            items_per_box: items_per_box || 0,
            raw_rate: raw_rate || 0,
            seller_code: seller_code || '',
            seller_contact: seller_contact || '',
            status
          })
        })
        const data = await response.json()
        if (data.success) {
          setMessage('Product updated successfully')
          setCurrentProduct(null)
          setName('')
          setCategoryId('')
          setBoxCount(0)
          setItemsPerBox(0)
          setRawRate(0)
          setSellerCode('')
          setSellerContact('')
          setStatus('active')
          setEditing(false)
          useEffect(() => {}, []) // re-fetch
        } else {
          setMessage(data.error || 'Failed to update')
        }
      } else {
        // Add new
        const response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            category_id,
            box_count: box_count || 0,
            items_per_box: items_per_box || 0,
            raw_rate: raw_rate || 0,
            seller_code: seller_code || '',
            seller_contact: seller_contact || '',
            status
          })
        })
        const data = await response.json()
        if (data.success) {
          setMessage('Product added successfully')
          setName('')
          setCategoryId('')
          setBoxCount(0)
          setItemsPerBox(0)
          setRawRate(0)
          setSellerCode('')
          setSellerContact('')
          setStatus('active')
          useEffect(() => {}, []) // re-fetch
        } else {
          setMessage(data.error || 'Failed to add')
        }
      }
    } catch (error) {
      setMessage('Error saving product')
      console.error('Error:', error)
    }
  }

  // Delete product
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/admin/products?id=${id}`, {
          method: 'DELETE'
        })
        const data = await response.json()
        if (data.success) {
          setMessage('Product deleted successfully')
          useEffect(() => {}, []) // re-fetch
        } else {
          setMessage(data.error || 'Failed to delete')
        }
      } catch (error) {
        setMessage('Error deleting product')
        console.error('Error:', error)
      }
    }
  }

  // Fetch categories for the select dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        const data = await response.json()
        if (data.success) {
          setCategories(data.categories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Products Management
        </h2>
        
        {/* Message */}
        {message && (
          <div className="mb-4 p-3 rounded mb-6 text-center">
            {message.startsWith('Loaded') || message.startsWith('Added') || message.startsWith('Updated')
              ? <p className="text-green-200 font-medium">{message}</p>
              : <p className="text-red-200 font-medium">{message}</p>}
          </div>
        )}

        {/* Navigation */}
        <div className="mb-6">
          <Link 
            href="/admin/categories"
            className="inline-block mr-4 py-2 px-4 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            ← Back to Categories
          </Link>
        </div>

        {/* Add Product Form */}
        <div className="bg-gray-900/50 rounded p-4 mb-6">
          <h4 className="text-sm font-medium text-white mb-4">
            {editing && currentProduct ? 'Edit Product' : 'Add New Product'}
          </h4>
          
          {/* Category Select */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-white mb-1">Category</label>
            <select
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
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

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name"
              className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
              required
            />
            <input
              type="number"
              value={box_count}
              onChange={(e) => setBoxCount(Number(e.target.value) || 0)}
              placeholder="Box count"
              className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
            />
            <input
              type="number"
              value={items_per_box}
              onChange={(e) => setItemsPerBox(Number(e.target.value) || 0)}
              placeholder="Items per box"
              className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
            />
            <input
              type="number"
              value={raw_rate}
              onChange={(e) => setRawRate(Number(e.target.value) || 0)}
              placeholder="Raw rate"
              className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={seller_code}
              onChange={(e) => setSellerCode(e.target.value)}
              placeholder="Seller code"
              className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
            />
            <input
              type="text"
              value={seller_contact}
              onChange={(e) => setSellerContact(e.target.value)}
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
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                  className="rounded border"
                />
                Active
              </label>
              <label className="flex-1 py-1 px-2 rounded border bg-gray-900/30 text-sm">
                <input
                  type="radio"
                  checked={status === 'inactive'}
                  onChange={() => setStatus('inactive')}
                  className="rounded border"
                />
                Inactive
              </label>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleSave}
              className="w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
            >
              {editing && currentProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
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
                <th className="text-left p-2">Seller Contact</th>
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
                  <td className="p-2 text-sm text-gray-400">{prod.seller_contact || '-'}</td>
                  <td className="p-2">
                    <span
                      className={`inline-flex items-center px-2 rounded text-xs ${prod.status === 'active' ? 'bg-green-600/30 text-green-200' : 'bg-gray-600/30 text-gray-300'}`}
                    >
                      {prod.status || 'active'}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/products/${prod.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {products.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No products found. Add a new product above.
          </p>
        )}
      </div>
    </div>
  )
}
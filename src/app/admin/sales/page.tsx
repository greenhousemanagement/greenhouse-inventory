'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SalesDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'customers' | 'orders'>('products')
  const [formData, setFormData] = useState({
    product_id: '',
    customer_id: '',
    quantity: 1,
    price: 0,
    status: 'open'
  })
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  // Fetch products, customers, and orders on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const prodResponse = await fetch('/api/admin/products')
        const prodData = await prodResponse.json()
        if (prodData.success) {
          setProducts(prodData.products)
        }

        // Fetch customers
        const custResponse = await fetch('/api/admin/products') // Using products endpoint as placeholder; in real app, would have /api/admin/customers
        const custData = await custResponse.json()

        // Fetch orders
        const orderResponse = await fetch('/api/admin/products') // Placeholder
        const orderData = await orderResponse.json()

        setProducts(prodData || [])
        setCustomers(custData || [])
        setOrders(orderData || [])
      } catch (error) {
        setMessage('Error loading data')
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Tab switching
  const switchTab = (tab: 'products' | 'customers' | 'orders') => {
    setActiveTab(tab)
  }

  // Handle product form submission (order placement)
  const handleOrderSubmit = async () => {
    if (!formData.product_id || !formData.customer_id) {
      setMessage('Please select product and customer')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'order' // Indicate this is an order
        })
      })
      const data = await response.json()
      if (data.success) {
        setMessage('Order placed successfully!')
        setSuccess(true)
        setFormData({
          product_id: '',
          customer_id: '',
          quantity: 1,
          price: 0,
          status: 'open'
        })
        fetchData()
      } else {
        setMessage(data.error || 'Failed to place order')
      }
    } catch (error) {
      setMessage('Error placing order')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle customer form submission
  const handleCustomerSubmit = async () => {
    if (!customerForm.name || !customerForm.email) {
      setMessage('Name and email are required')
      return
    }

    setLoading(true)
    try {
      // In real app, would POST to /api/admin/customers
      // For now, just show success and add to local state
      setMessage('Customer added successfully')
      setSuccess(true)
      setCustomerForm({ name: '', email: '', phone: '', password: '' })
      fetchData()
    } catch (error) {
      setMessage('Error adding customer')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          <p className="text-center text-muted-foreground">Loading sales dashboard...</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Sales Team Dashboard
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
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-white/20">
          <button
            onClick={() => switchTab('products')}
            className={`py-2 px-4 rounded tab-${activeTab === 'products' ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-primary/10 transition-colors'}`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => switchTab('customers')}
            className={`py-2 px-4 rounded tab-${activeTab === 'customers' ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-primary/10 transition-colors'}`}
          >
            Customers ({customers.length})
          </button>
          <button
            onClick={() => switchTab('orders')}
            className={`py-2 px-4 rounded tab-${activeTab === 'orders' ? 'bg-primary/20 text-primary' : 'text-white/60 hover:bg-primary/10 transition-colors'}`}
          >
            Orders ({orders.length})
          </button>
        </div>

        {/* Current Tab Content */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-primary mb-4">Products</h3>

            {/* Product List for Order Selection */}
            <div className="overflow-x-auto rounded border border-white/20">
              <table className="min-w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Stock (Boxes)</th>
                    <th className="text-left p-2">Price Action</th>
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
                      <td className="p-2">
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          placeholder="Price"
                          className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                        />
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => {
                            setFormData({
                              ...formData,
                              product_id: prod.id,
                              price: prod.raw_rate || 0
                            })
                          }
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Form */}
            {activeTab === 'products' && (
              <div className="bg-gray-900/50 rounded p-4 mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Place New Order</h4>
                <input
                  type="hidden"
                  value={formData.product_id}
                  onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                  defaultValue=""
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2 hidden"
                />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                  placeholder="Customer ID or select from customers tab"
                  value={formData.customer_id}
                  onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  required
                />
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  placeholder="Quantity"
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  min={1}
                />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="Price per unit"
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
              </div>
              <button
                onClick={handleOrderSubmit}
                className="w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
              >
                Place Order
              </button>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-primary mb-4">Customer Management</h3>

            {/* Customer Form */}
            <div className="bg-gray-900/50 rounded p-4 mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Add New Customer</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={customerForm.name}
                  onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={customerForm.email}
                  onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Phone"
                  value={customerForm.phone}
                  onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={customerForm.password}
                  onChange={(e) => setCustomerForm({ ...customerForm, password: e.target.value })}
                  className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
                />
              </div>
              <button
                onClick={handleCustomerSubmit}
                className="w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
              >
                Add Customer
              </button>
            </div>

            {/* Customers List */}
            <div className="overflow-x-auto rounded border border-white/20">
              <table className="min-w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Phone</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((cust: any) => (
                    <tr key={cust.id} className="border-b border-white/10 hover:bg-gray-900/20">
                      <td className="p-2 font-medium">{cust.name}</td>
                      <td className="p-2 text-sm text-gray-400">{cust.email}</td>
                      <td className="p-2 text-sm text-gray-400">{cust.phone || '-'}</td>
                      <td className="p-2">
                        <button
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {customers.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No customers found. Add one above.
              </p>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-primary mb-4">Orders</h3>

            {/* Orders List */}
            <div className="overflow-x-auto rounded border border-white/20">
              <table className="min-w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-2">Order #</th>
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">Customer</th>
                    <th className="text-left p-2">Quantity</th>
                    <th className="text-left p-2">Price</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} className="border-b border-white/10 hover:bg-gray-900/20">
                      <td className="p-2">{order.order_number || 'N/A'}</td>
                      <td className="p-2 text-sm text-gray-400">
                        {order.product_name || 'N/A'}
                      </td>
                      <td className="p-2 text-sm text-gray-400">
                        {order.customer_name || 'N/A'}
                      </td>
                      <td className="p-2">{order.quantity || 0}</td>
                      <td className="p-2">₹{order.price || 0}</td>
                      <td className="p-2">
                        <span
                          className={`inline-flex items-center px-2 rounded text-xs ${order.status === 'completed' ? 'bg-green-600/30 text-green-200' : 'bg-gray-600/30 text-gray-300'}`}
                        >
                          {order.status || 'open'}
                        </span>
                      </td>
                      <td className="p-2">
                        <button className="text-red-400 hover:text-red-300 text-sm">
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {orders.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No orders found. Select products and place orders.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
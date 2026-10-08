import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [editing, setEditing] = useState<boolean>(false)
  const [currentCategory, setCurrentCategory] = useState<any>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories')
        const data = await response.json()
        if (data.success) {
          setCategories(data.categories)
          setMessage(`Loaded ${data.categories.length} categories`)
        } else {
          setMessage(data.error || 'Failed to load categories')
        }
      } catch (error) {
        setMessage('Error loading categories')
        console.error('Error:', error)
      }
    }
    fetchCategories()
  }, [])

  // Add/Update category
  const handleSave = async () => {
    if (!name.trim()) {
      setMessage('Category name is required')
      return
    }

    try {
      if (currentCategory?.id) {
        // Update existing
        const response = await fetch('/api/admin/categories', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentCategory.id, name, description })
        })
        const data = await response.json()
        if (data.success) {
          setMessage('Category updated successfully')
          setCurrentCategory(null)
          setName('')
          setDescription('')
          setEditing(false)
          useEffect(() => {}, []) // re-fetch
        } else {
          setMessage(data.error || 'Failed to update')
        }
      } else {
        // Add new
        const response = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description })
        })
        const data = await response.json()
        if (data.success) {
          setMessage('Category added successfully')
          setName('')
          setDescription('')
          useEffect(() => {}, []) // re-fetch
        } else {
          setMessage(data.error || 'Failed to add')
        }
      }
    } catch (error) {
      setMessage('Error saving category')
      console.error('Error:', error)
    }
  }

  // Delete category
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`/api/admin/categories?id=${id}`, {
          method: 'DELETE'
        })
        const data = await response.json()
        if (data.success) {
          setMessage('Category deleted successfully')
          useEffect(() => {}, []) // re-fetch
        } else {
          setMessage(data.error || 'Failed to delete')
        }
      } catch (error) {
        setMessage('Error deleting category')
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Categories Management
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
            href="/admin"
            className="inline-block mr-4 py-2 px-4 rounded bg-gray-600 text-white font-medium hover:bg-gray-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>
          <Link 
            href="/admin/products"
            className="inline-block py-2 px-4 rounded bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            Products Management
          </Link>
        </div>

        {/* Add Category Form */}
        <div className="bg-gray-900/50 rounded p-4 mb-6">
          <h4 className="text-sm font-medium text-white mb-2">
            {editing && currentCategory ? 'Edit Category' : 'Add New Category'}
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
              required
            />
            <input
              type="text"
              value description || ''
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="mt-1 block w-full rounded border-white/20 bg-gray-900/50 text-white px-3 py-2"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="w-full py-2 rounded bg-primary text-white font-medium transition-colors hover:bg-primary/90"
            >
              {editing && currentCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="overflow-x-auto rounded border border-white/20">
          <table className="min-w-full text-sm text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Description</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat: any) => (
                <tr key={cat.id} className="border-b border-white/10 hover:bg-gray-900/20">
                  <td className="p-2 font-medium">{cat.name}</td>
                  <td className="p-2 text-sm text-gray-400">{cat.description || '-'}</td>
                  <td className="p-2">
                    <span
                      className={`inline-flex items-center px-2 rounded text-xs ${cat.status === 'active' ? 'bg-green-600/30 text-green-200' : 'bg-gray-600/30 text-gray-300'}`}
                    >
                      {cat.status || 'active'}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/categories/${cat.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(cat.id)}
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
        {categories.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No categories found. Add a new category above.
          </p>
        )}
      </div>
    </div>
  )
}
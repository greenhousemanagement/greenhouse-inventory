'use client'

import { useEffect } from 'react'

export default function AdminPage() {
  // Redirect to dashboard immediately on page load
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.location.href = '/admin/dashboard'
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [])

  return null
}
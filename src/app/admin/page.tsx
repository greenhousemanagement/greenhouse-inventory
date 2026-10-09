'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard when admin page is accessed directly
    const timeoutId = setTimeout(() => {
      router.push('/admin/dashboard')
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [router])

  return null
}
'use client'

import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  // Redirect to dashboard - no more auth-test redirect
  // router.push('/admin/auth-test')

  return null
}
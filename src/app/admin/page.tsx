'use client'

import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  // Redirect to auth-test page
  router.push('/admin/auth-test')

  return null
}
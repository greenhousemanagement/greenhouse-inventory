import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase client initialization
let supabase = null

if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  } catch (e) {
    console.error('Supabase client initialization error:', e)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Use Supabase built-in authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check profiles table for admin role (single admin setup)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', data.user?.id)
      .single()

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Return admin session data
    return NextResponse.json({
      success: true,
      adminId: data.user?.id,
      adminName: profile?.name || data.user?.email?.split('@')[0] || 'Admin',
      role: profile?.role || 'admin',
      message: 'Admin authentication successful'
    })
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
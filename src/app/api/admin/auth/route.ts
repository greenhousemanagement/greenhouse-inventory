import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client
// These env vars should be set: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not configured, using fallback auth')
}

let supabase = null
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (e) {
  console.error('Supabase client initialization error:', e)
}

// Default admin credentials for fallback authentication
const FALLBACK_ADMIN_EMAIL = 'admin@greenhouse.com'
const FALLBACK_ADMIN_PASSWORD = 'admin123'

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

    // Try Supabase verification first
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          // Fall through to fallback if Supabase fails
        } else {
          // Return admin session data
          return NextResponse.json({
            success: true,
            adminId: data.user?.id,
            adminName: data.user?.user_metadata?.name || data.user?.email?.split('@')[0] || 'Admin',
            role: 'admin',
            message: 'Admin authentication successful'
          })
        }
      } catch (supaError) {
        console.error('Supabase auth error, falling back to fallback:', supaError)
      }
    }

    // Fallback: verify against hardcoded admin credentials (works without Supabase config)
    if (email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        adminId: 'admin-fallback-1',
        adminName: 'Admin User',
        role: 'admin',
        message: 'Admin authentication successful'
      })
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
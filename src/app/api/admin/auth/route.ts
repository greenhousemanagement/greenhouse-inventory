import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client
// These env vars should be set: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars not configured')
}

let supabase = null
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} catch (e) {
  console.error('Supabase client initialization error:', e)
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
    if (supabase) {
      try {
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

        // Return admin session data
        return NextResponse.json({
          success: true,
          adminId: data.user?.id,
          adminName: data.user?.user_metadata?.name || data.user?.email?.split('@')[0] || 'Admin',
          role: 'admin',
          message: 'Admin authentication successful'
        })
      } catch (supaError) {
        console.error('Supabase auth error:', supaError)
        return NextResponse.json(
          { error: 'Authentication service unavailable' },
          { status: 500 }
        )
      }
    }

    // Fallback when Supabase is not configured
    return NextResponse.json(
      { error: 'Supabase not configured - please set up Supabase credentials' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
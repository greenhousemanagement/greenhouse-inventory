import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client
// These env vars should be set: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase env vars not configured, using PIN-based auth fallback')
}

export let supabase = null
try {
  supabase = createClient(supabaseUrl, supabaseServiceKey)
} catch (e) {
  console.error('Supabase client initialization error:', e)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pin } = body

    if (!pin) {
      return NextResponse.json(
        { error: 'PIN is required' },
        { status: 400 }
      )
    }

    // Try Supabase verification first
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, role, pin')
          .eq('role', 'admin')
          .eq('pin', pin)
          .single()

        if (error || !data) {
          // Fall back to hardcoded PIN if Supabase fails
        } else {
          // Return admin session data (no sensitive PIN in response)
          return NextResponse.json({
            success: true,
            adminId: data.id,
            adminName: data.name,
            role: data.role,
            message: 'Admin authentication successful'
          })
        }
      } catch (supaError) {
        console.error('Supabase auth error, falling back to PIN:', supaError)
      }
    }

    // Fallback: verify against hardcoded admin PIN (8899)
    const ADMIN_PIN = '8899'
    if (pin === ADMIN_PIN) {
      return NextResponse.json({
        success: true,
        adminId: 'admin-1',
        adminName: 'Admin User',
        role: 'admin',
        message: 'Admin authentication successful'
      })
    }

    return NextResponse.json(
      { error: 'Invalid PIN or admin not found' },
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
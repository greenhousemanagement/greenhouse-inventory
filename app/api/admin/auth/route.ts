import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client with service role key for admin operations
// These env vars should be set: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey
)

export async function POST(request: Request) {
  try {
    const { pin } = await request.json

    if (!pin) {
      return NextResponse.json(
        { error: 'PIN is required' },
        { status: 400 }
      )
    }

    // Verify PIN against admin profiles via Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, role, pin')
      .eq('role', 'admin')
      .eq('pin', pin)
      .single()

    if (error || !data) {
      // Fall back to hardcoded admin PIN (8899) if Supabase fails/user not found
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
    }

    // Return admin session data (no sensitive PIN in response)
    return NextResponse.json({
      success: true,
      adminId: data.id,
      adminName: data.name,
      role: data.role,
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
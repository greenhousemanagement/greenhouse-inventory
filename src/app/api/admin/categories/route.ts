import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Category type enum
const CATEGORY_TYPES = ['flowers', 'plant', 'seeds']

const isValidCategoryType = (type: string): boolean => {
  return CATEGORY_TYPES.includes(type)
}

// Helper to create Supabase client
const createSupabaseClient = () => {
  try {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  } catch (e) {
    console.error('Supabase client initialization error:', e)
    return null
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createSupabaseClient()
    if (!supabase) {
      // Return empty categories - feature available when Supabase is configured
      return NextResponse.json({
        success: true,
        categories: [],
        message: 'Supabase not configured - categories management available when Supabase is set up'
      })
    }

    // Fetch all categories
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Map categories - ensure type is valid with default 'flowers'
    const mappedCategories = (data || []).map(cat => {
      const rawType = cat.type || 'flowers'
      const validType = isValidCategoryType(rawType) ? rawType : 'flowers'
      return {
        ...cat,
        type: validType
      }
    })

    return NextResponse.json({
      success: true,
      categories: mappedCategories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseClient()
    if (!supabase) {
      // Supabase not configured - return success with message
      return NextResponse.json({
        success: true,
        message: 'Category operations available when Supabase is configured'
      })
    }

    const body = await request.json()
    const { name, description, type } = body

    // Validate category type
    const categoryType = isValidCategoryType(type) ? type : 'flowers'

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 500 }
      )
    }

    // Insert new category
    const { data, error } = await supabase
      .from('categories')
      .insert({ name, description, type: categoryType })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      category: data
    })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createSupabaseClient()
    if (!supabase) {
      // Supabase not configured - return success with message
      return NextResponse.json({
        success: true,
        message: 'Category update available when Supabase is configured'
      })
    }

    const body = await request.json()
    const { id, name, description } = body

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Category ID and name are required' },
        { status: 400 }
      )
    }

    // Update category
    const { data, error } = await supabase
      .from('categories')
      .update({ name, description })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      category: data
    })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createSupabaseClient()
    if (!supabase) {
      // Supabase not configured - delete available when Supabase is configured
      return NextResponse.json({
        success: true,
        message: 'Category deletion available when Supabase is configured'
      })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    // Delete category
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
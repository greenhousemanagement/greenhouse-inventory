import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client for admin operations
export let supabase = null
try {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
} catch (e) {
  console.error('Supabase client initialization error:', e)
}

export async function GET(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not initialized' },
        { status: 500 }
      )
    }

    // Fetch all products with category names
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories:name (categories.name)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      products: data || []
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not initialized' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const {
      name,
      category_id,
      specification,
      box_count,
      items_per_box,
      raw_rate,
      seller_code,
      seller_contact,
      status
    } = body

    // Validate required fields
    if (!name || !category_id) {
      return NextResponse.json(
        { error: 'Product name and category are required' },
        { status: 400 }
      )
    }

    // Insert new product
    const { data, error } = await supabase
      .from('products')
      .insert({
        name,
        category_id,
        specification,
        box_count: box_count || 0,
        items_per_box: items_per_box || 0,
        raw_rate: raw_rate || 0,
        seller_code: seller_code || '',
        seller_contact: seller_contact || '',
        status: status || 'active'
      })
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
      product: data
    })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not initialized' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const {
      id,
      name,
      category_id,
      specification,
      box_count,
      items_per_box,
      raw_rate,
      seller_code,
      seller_contact,
      status
    } = body

    if (!id || !name) {
      return NextResponse.json(
        { error: 'Product ID and name are required' },
        { status: 400 }
      )
    }

    // Update product
    const { data, error } = await supabase
      .from('products')
      .update({
        name,
        category_id,
        specification,
        box_count,
        items_per_box,
        raw_rate,
        seller_code,
        seller_contact,
        status
      })
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
      product: data
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase not initialized' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Delete product
    const { error } = await supabase
      .from('products')
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
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
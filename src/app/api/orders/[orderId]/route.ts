import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(
  _req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId;

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        customers (*),
        order_items (*)
      `)
      .eq('id', orderId)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const orderId = params.orderId;
    const body = await req.json();

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update(body)
      .eq('id', orderId)
      .select()
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 400 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { Database } from '@/lib/database.types';

type Customer = Database['public']['Tables']['customers']['Insert'];
type Order = Database['public']['Tables']['orders']['Insert'];
type OrderItem = Database['public']['Tables']['order_items']['Insert'];

interface CreateOrderRequest {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPincode: string;
  orderNotes?: string;
  items: Array<{
    productId: string;
    productName: string;
    productImage?: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentMethod: 'COD' | 'Razorpay' | 'Stripe';
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrderRequest = await req.json();

    // Validate required fields
    if (!body.customerName || !body.email || !body.phone || !body.items.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or get customer
    let customerId: string;

    const { data: existingCustomer } = await supabaseAdmin
      .from('customers')
      .select('id')
      .eq('email', body.email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Update customer info if changed
      await supabaseAdmin
        .from('customers')
        .update({
          name: body.customerName,
          phone: body.phone,
        })
        .eq('id', customerId);
    } else {
      const { data: newCustomer, error: customerError } = await supabaseAdmin
        .from('customers')
        .insert({
          name: body.customerName,
          email: body.email,
          phone: body.phone,
        } as Customer)
        .select('id')
        .single();

      if (customerError || !newCustomer) {
        throw new Error('Failed to create customer');
      }

      customerId = newCustomer.id;
    }

    // Generate order number (FABRO-YYYYMMDD-XXXXX format)
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const orderNumber = `FABRO-${dateStr}-${code}`;

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        shipping_address: body.shippingAddress,
        shipping_city: body.shippingCity,
        shipping_state: body.shippingState,
        shipping_pincode: body.shippingPincode,
        order_notes: body.orderNotes || null,
        total_amount: body.totalAmount,
        payment_method: body.paymentMethod,
        payment_status: body.paymentMethod === 'COD' ? 'pending' : 'pending',
        order_status: 'placed',
      } as Order)
      .select('id')
      .single();

    if (orderError || !order) {
      throw new Error('Failed to create order');
    }

    // Create order items
    const orderItems = body.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_image: item.productImage || null,
      quantity: item.quantity,
      price: item.price,
    })) as OrderItem[];

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw new Error('Failed to create order items');
    }

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        orderNumber: orderNumber,
        customerId: customerId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    );
  }
}

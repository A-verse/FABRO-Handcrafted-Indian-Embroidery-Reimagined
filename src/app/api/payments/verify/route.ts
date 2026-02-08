import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';

interface VerifyPaymentRequest {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: VerifyPaymentRequest = await req.json();

    // Verify signature
    const message = `${body.razorpayOrderId}|${body.razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(message)
      .digest('hex');

    if (expectedSignature !== body.razorpaySignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update order with payment details
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update({
        razorpay_order_id: body.razorpayOrderId,
        razorpay_payment_id: body.razorpayPaymentId,
        razorpay_signature: body.razorpaySignature,
        payment_status: 'paid',
      })
      .eq('id', body.orderId)
      .select()
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, order },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}

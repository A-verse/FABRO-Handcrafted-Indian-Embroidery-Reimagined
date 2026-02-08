import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

interface CreateRazorpayOrderRequest {
  amount: number; // in paisa (₹100 = 10000 paisa)
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateRazorpayOrderRequest = await req.json();

    const options = {
      amount: body.amount, // amount in paisa
      currency: 'INR',
      receipt: body.orderId,
      notes: {
        order_id: body.orderId,
        customer_name: body.customerName,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}

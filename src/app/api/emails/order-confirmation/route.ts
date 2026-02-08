import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase-admin';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOrderEmailRequest {
  orderId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SendOrderEmailRequest = await req.json();

    // Get order details
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        customers (*),
        order_items (*)
      `)
      .eq('id', body.orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const itemsHtml = order.order_items
      .map((item: any) => `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px; text-align: left;">${item.product_name}</td>
          <td style="padding: 12px; text-align: center;">x${item.quantity}</td>
          <td style="padding: 12px; text-align: right;">₹${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
      `)
      .join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #8B4252; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f5f3f0; padding: 20px; border-radius: 0 0 8px 8px; }
          .section { margin: 20px 0; }
          .section-title { font-weight: bold; font-size: 16px; margin-bottom: 10px; color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          .total-row { font-weight: bold; font-size: 18px; color: #8B4252; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          .order-id { font-family: monospace; font-size: 14px; color: #8B4252; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">FABRO</h1>
            <p style="margin: 5px 0 0 0;">Order Confirmation</p>
          </div>
          <div class="content">
            <p>Hi ${order.customers.name},</p>
            <p>Thank you for your order! Here are your order details:</p>

            <div class="section">
              <div class="section-title">Order ID</div>
              <p class="order-id">${order.order_number}</p>
            </div>

            <div class="section">
              <div class="section-title">Items</div>
              <table>
                <thead style="background: #e5e7eb;">
                  <tr>
                    <th style="padding: 12px; text-align: left;">Product</th>
                    <th style="padding: 12px; text-align: center;">Qty</th>
                    <th style="padding: 12px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>

            <div class="section">
              <div class="section-title">Order Summary</div>
              <table style="border: none;">
                <tr style="border: none;">
                  <td style="padding: 8px; border: none;">Subtotal:</td>
                  <td style="padding: 8px; text-align: right; border: none;">₹${order.total_amount.toLocaleString()}</td>
                </tr>
                <tr style="border: none;">
                  <td style="padding: 8px; border: none;">Shipping:</td>
                  <td style="padding: 8px; text-align: right; border: none; color: #059669;">Free</td>
                </tr>
                <tr class="total-row" style="border-top: 2px solid #ddd;">
                  <td style="padding: 12px;">Total:</td>
                  <td style="padding: 12px; text-align: right;">₹${order.total_amount.toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <div class="section-title">Shipping Address</div>
              <p>
                ${order.shipping_address}<br>
                ${order.shipping_city}, ${order.shipping_state} ${order.shipping_pincode}
              </p>
            </div>

            <div class="section">
              <div class="section-title">Payment Method</div>
              <p>${order.payment_method}</p>
            </div>

            ${order.order_notes ? `
            <div class="section">
              <div class="section-title">Special Notes</div>
              <p>${order.order_notes}</p>
            </div>
            ` : ''}

            <p style="margin-top: 30px;">Our team will reach out via WhatsApp within 24 hours to confirm your order.</p>
            <p>Thank you for choosing FABRO!</p>

            <div class="footer">
              <p>Questions? Reply to this email or contact us on WhatsApp</p>
              <p>FABRO - Hand-embroidered. Heart-approved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'orders@fabro.in',
      to: order.customers.email,
      subject: `Order Confirmation - ${order.order_number}`,
      html: emailHtml,
    });

    return NextResponse.json(
      { success: true, messageId: (result as any).id || 'sent' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

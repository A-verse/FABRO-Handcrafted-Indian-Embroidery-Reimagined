/**
 * Generate a unique Order ID
 * Format: FABRO-YYYYMMDD-XXXXX
 * Example: FABRO-20260208-A7K2M
 */
export function generateOrderId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Generate 5-character alphanumeric code
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return `FABRO-${dateStr}-${code}`;
}

/**
 * Order interface for storing and retrieving order data
 */
export interface Order {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalPrice: number;
  paymentMethod: 'COD';
  createdAt: string;
}

/**
 * Store order in localStorage
 */
export function storeOrder(order: Order): void {
  try {
    localStorage.setItem(`fabro-order-${order.orderId}`, JSON.stringify(order));
    // Also store the latest order ID for quick access
    localStorage.setItem('fabro-latest-order-id', order.orderId);
  } catch (error) {
    console.error('Error storing order:', error);
  }
}

/**
 * Retrieve order from localStorage
 */
export function getOrder(orderId: string): Order | null {
  try {
    const stored = localStorage.getItem(`fabro-order-${orderId}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error retrieving order:', error);
    return null;
  }
}

/**
 * Get the latest order ID
 */
export function getLatestOrderId(): string | null {
  try {
    return localStorage.getItem('fabro-latest-order-id');
  } catch (error) {
    console.error('Error retrieving latest order ID:', error);
    return null;
  }
}

/**
 * Generate WhatsApp message for order confirmation
 */
export function generateWhatsAppMessage(order: Order): string {
  const itemsList = order.items
    .map((item) => `• ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`)
    .join('\n');

  return `Hello FABRO! 🛍️\n\n` +
    `I've placed order #${order.orderId}\n\n` +
    `📦 Items:\n${itemsList}\n\n` +
    `💰 Total: ₹${order.totalPrice.toLocaleString()}\n\n` +
    `📍 Delivery: ${order.address}, ${order.city}, ${order.state} - ${order.pincode}\n\n` +
    `Please confirm this order. Thanks!`;
}

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          email?: string;
          phone?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string;
          shipping_address: string;
          shipping_city: string;
          shipping_state: string;
          shipping_pincode: string;
          order_notes: string | null;
          total_amount: number;
          payment_method: 'COD' | 'Razorpay' | 'Stripe';
          payment_status: 'pending' | 'paid' | 'failed';
          order_status: 'placed' | 'confirmed' | 'in_progress' | 'shipped' | 'delivered' | 'cancelled';
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          razorpay_signature: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_id: string;
          shipping_address: string;
          shipping_city: string;
          shipping_state: string;
          shipping_pincode: string;
          order_notes?: string;
          total_amount: number;
          payment_method: 'COD' | 'Razorpay' | 'Stripe';
          payment_status?: 'pending' | 'paid' | 'failed';
          order_status?: 'placed' | 'confirmed' | 'in_progress' | 'shipped' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          razorpay_signature?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          payment_status?: 'pending' | 'paid' | 'failed';
          order_status?: 'placed' | 'confirmed' | 'in_progress' | 'shipped' | 'delivered' | 'cancelled';
          razorpay_order_id?: string;
          razorpay_payment_id?: string;
          razorpay_signature?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image: string | null;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          product_image?: string;
          quantity: number;
          price: number;
          created_at?: string;
        };
        Update: never;
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
        };
        Update: never;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

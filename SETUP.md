# FABRO E-Commerce System - Setup & Deployment Guide

Complete guide to deploy the FABRO production-ready e-commerce system with backend, admin panel, and payment processing.

---

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (free tier works)
- Razorpay account (for online payments - optional for COD-only setup)
- Resend account (for email notifications - optional)

---

## 🚀 Quick Start (COD Only)

### 1. Clone & Install

```bash
git clone https://github.com/A-verse/FABRO-Handcrafted-Indian-Embroidery-Reimagined.git
cd FABRO-Handcrafted-Indian-Embroidery-Reimagined
npm install
```

### 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and project name (e.g., "FABRO Production")
4. Select region closest to your users (e.g., `ap-south-1` for India)
5. Set a strong database password
6. Wait for project to initialize (~2 minutes)

### 3. Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire content from `supabase/migrations/001_initial_schema.sql`
4. Paste and click "Run"
5. Verify tables created: Go to **Table Editor** and confirm:
   - `customers`
   - `orders`
   - `order_items`
   - `admin_users`

### 4. Get Supabase Credentials

In Supabase dashboard:

1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (under "Project API keys")
   - **service_role key** (under "Project API keys" - keep this secret!)

### 5. Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Razorpay Configuration (leave as placeholder for COD-only setup)
NEXT_PUBLIC_RAZORPAY_KEY_ID=placeholder_key_id
RAZORPAY_KEY_SECRET=placeholder_key_secret

# Resend Configuration (leave as placeholder to skip emails)
RESEND_API_KEY=placeholder_resend_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@fabro.in
```

**⚠️ Important:** Only the Supabase keys are required for COD functionality. You can leave Razorpay and Resend as placeholders.

### 6. Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add User" → "Create New User"
3. Enter:
   - Email: `admin@fabro.in` (or your preferred email)
   - Password: Choose a strong password
   - Confirm email: Enable (or disable for testing)
4. Click "Create User"

5. Now add to `admin_users` table:
   - Go to **Table Editor** → **admin_users**
   - Click "Insert" → "Insert Row"
   - Enter email: `admin@fabro.in` (must match auth user email)
   - Click "Save"

### 7. Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 8. Test Admin Login

1. Go to `http://localhost:3000/admin/login`
2. Enter admin credentials
3. You should see the admin dashboard at `/admin`

---

## 🧪 Testing COD Flow

### Complete Order Flow Test

1. **Browse Products**
   - Go to `/products`
   - Click on any product → "Add to Cart"
   - Verify cart counter updates in header

2. **View Cart**
   - Click cart icon → Go to `/cart`
   - Verify products listed
   - Click "Proceed to Checkout"

3. **Checkout with COD**
   - Fill in customer details:
     ```
     Name: Test Customer
     Email: test@example.com
     Phone: 9876543210
     Address: 123 Test Street
     City: Mumbai
     State: Maharashtra
     PIN: 400001
     ```
   - **Payment Method:** Select "Cash on Delivery" (should be default)
   - Click "Place Order"

4. **Verify Order Created**
   - You should be redirected to `/order-confirmation`
   - Note the Order ID (format: `FABRO-YYYYMMDD-XXXXX`)

5. **Check Admin Dashboard**
   - Login to `/admin`
   - Verify new order appears in list
   - Click "View" to see order details
   - Verify customer info, items, and status = "placed"

6. **Check Database**
   - In Supabase → **Table Editor** → **orders**
   - Verify new order row exists
   - `payment_method` = "COD"
   - `payment_status` = "pending"
   - `order_status` = "placed"

7. **Test Order Tracking**
   - Go to `/track-order`
   - Enter Order ID and Phone Number (9876543210)
   - Verify order details displayed

8. **Update Order Status (Admin)**
   - In admin → order detail page
   - Change status: `placed` → `confirmed`
   - Click "Update Status"
   - Refresh tracking page → verify status updated

---

## 🌐 Production Deployment (Vercel)

### 1. Connect to Vercel

```bash
npm install -g vercel
vercel login
```

### 2. Deploy Project

```bash
vercel
```

Follow prompts:
- Set up and deploy? **Y**
- Link to existing project? **N**
- Project name: `fabro-ecommerce`
- Directory: `./` (press Enter)
- Override settings? **N**

### 3. Set Environment Variables in Vercel

In Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel URL)
   - (Add Razorpay/Resend when ready)

3. Set for: **Production**, **Preview**, **Development**

### 4. Redeploy

```bash
vercel --prod
```

### 5. Update Supabase URL Authentication

In Supabase dashboard:
1. Go to **Authentication** → **URL Configuration**
2. Add your Vercel domain to **Site URL** and **Redirect URLs**

---

## 📧 Email Setup (Optional)

### Enable Order Confirmation Emails

1. Sign up at [resend.com](https://resend.com)
2. Get API key from dashboard
3. Add domain verification or use `onboarding@resend.dev` for testing
4. Update `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
5. Restart dev server

**Email Features:**
- Automatic order confirmation emails after checkout
- Professional HTML template with order details
- Sent from: `orders@fabro.in` (configure domain in Resend)

---

## 💳 Online Payments Setup (Optional)

### Integrate Razorpay

1. Sign up at [razorpay.com](https://razorpay.com)
2. Go to **Settings** → **API Keys**
3. Generate keys for **Test Mode**
4. Update `.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret_key
   ```

5. Restart server - Razorpay option now appears in checkout

**Payment Flow:**
- Customer selects "Card / UPI / Wallet"
- Clicks "Place Order" → Razorpay modal opens
- Customer completes payment
- Backend verifies signature
- Order marked as paid in database

**Production:** Switch to **Live Mode** keys when ready

---

## 🔐 Security Checklist

- ✅ Never commit `.env.local` to Git (already in `.gitignore`)
- ✅ Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)
- ✅ Keep `RAZORPAY_KEY_SECRET` secret (server-side only)
- ✅ Enable Row Level Security on all Supabase tables
- ✅ Verify API routes validate inputs
- ✅ Use environment variables in Vercel, not hardcoded
- ✅ Set up custom domain with HTTPS (Vercel provides free SSL)

---

## 📊 Database Schema Reference

### customers
```sql
id              UUID PRIMARY KEY
name            TEXT NOT NULL
email           TEXT NOT NULL
phone           TEXT NOT NULL
created_at      TIMESTAMP DEFAULT NOW()
updated_at      TIMESTAMP DEFAULT NOW()

UNIQUE INDEX: email
INDEX: phone
```

### orders
```sql
id                      UUID PRIMARY KEY
order_number            TEXT UNIQUE (format: FABRO-YYYYMMDD-XXXXX)
customer_id             UUID REFERENCES customers(id)
shipping_address        TEXT NOT NULL
shipping_city           TEXT NOT NULL
shipping_state          TEXT NOT NULL
shipping_pincode        TEXT NOT NULL
order_notes             TEXT
total_amount            DECIMAL NOT NULL
payment_method          TEXT (COD | Razorpay)
payment_status          TEXT (pending | paid | failed)
order_status            TEXT (placed | confirmed | in_progress | shipped | delivered | cancelled)
razorpay_order_id       TEXT
razorpay_payment_id     TEXT
razorpay_signature      TEXT
created_at              TIMESTAMP
updated_at              TIMESTAMP

INDEXES: customer_id, order_number, created_at
```

### order_items
```sql
id              UUID PRIMARY KEY
order_id        UUID REFERENCES orders(id) ON DELETE CASCADE
product_id      TEXT NOT NULL
product_name    TEXT NOT NULL
product_image   TEXT
quantity        INTEGER NOT NULL
price           DECIMAL NOT NULL
created_at      TIMESTAMP

INDEX: order_id
```

### admin_users
```sql
id              UUID PRIMARY KEY
email           TEXT UNIQUE NOT NULL
created_at      TIMESTAMP

UNIQUE INDEX: email
```

---

## 🛠️ Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution:** Verify `.env.local` exists and contains correct Supabase URL and keys. Restart dev server.

### Issue: Admin login fails
**Solution:** 
1. Verify user exists in Supabase Authentication
2. Verify email exists in `admin_users` table
3. Check emails match exactly (case-sensitive)

### Issue: Orders not appearing in admin dashboard
**Solution:**
1. Check Supabase Table Editor → verify order exists
2. Verify RLS policies allow admin access
3. Check browser console for errors

### Issue: Razorpay modal not opening
**Solution:**
1. Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set
2. Check browser console for script loading errors
3. Ensure key starts with `rzp_test_` or `rzp_live_`

### Issue: Emails not sending
**Solution:**
1. Verify `RESEND_API_KEY` is set correctly
2. Check Resend dashboard for error logs
3. Verify domain is verified (or use onboarding domain for testing)

---

## 📱 Features Overview

### Customer Features
- ✅ Browse products with rich details
- ✅ Add to cart with quantity control
- ✅ Checkout with form validation
- ✅ COD payment (no account required)
- ✅ Online payment via Razorpay (optional)
- ✅ Order confirmation page
- ✅ Order tracking with verification
- ✅ Email notifications

### Admin Features
- ✅ Secure login with email/password
- ✅ Dashboard with order statistics
- ✅ Filter orders by status
- ✅ View detailed order information
- ✅ Update order status
- ✅ Track payment status
- ✅ View customer details

### Technical Features
- ✅ Next.js 16 with App Router
- ✅ TypeScript for type safety
- ✅ Supabase PostgreSQL backend
- ✅ Row Level Security
- ✅ Server-side API routes
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized
- ✅ Production-ready build

---

## 🔄 Order Status Flow

```
placed → confirmed → in_progress → shipped → delivered
                                            ↓
                                       cancelled (any stage)
```

### Status Meanings
- **placed** - Order received, awaiting admin confirmation
- **confirmed** - Admin confirmed, preparing for production
- **in_progress** - Items being crafted/embroidered
- **shipped** - Order dispatched, in transit
- **delivered** - Order received by customer
- **cancelled** - Order cancelled (refund if paid)

---

## 📞 Support & Maintenance

### Regular Tasks
- **Daily:** Check admin dashboard for new orders
- **Weekly:** Review order status updates
- **Monthly:** Review database size and performance

### Monitoring
- Vercel deployment status
- Supabase dashboard for database health
- Error logs in Vercel/Supabase

### Backup
- Supabase provides automatic daily backups (check Settings → Database)
- Download backups monthly for extra safety

---

## 🎯 Next Steps

### Immediate
1. ✅ Complete setup following this guide
2. ✅ Test COD flow end-to-end
3. ✅ Add real products to database
4. ✅ Deploy to production

### Future Enhancements
- [ ] Customer accounts and order history
- [ ] Inventory management
- [ ] Discount codes/coupons
- [ ] Advanced analytics dashboard
- [ ] SMS notifications
- [ ] Product reviews
- [ ] Wishlist functionality
- [ ] Multi-currency support

---

## 📄 License

MIT License - See LICENSE file

---

## 🆘 Need Help?

- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Razorpay Docs:** [razorpay.com/docs](https://razorpay.com/docs)

---

**Built with 🧵 by FABRO Team**
*Hand-embroidered. Heart-approved.*

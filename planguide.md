# GreenHouse Inventory Management - Project Guide

## Project Overview
A web-based inventory and sales order tracker for greenhouse products (flowers, vegetables, plants). Multi-role system serving admin, packaging team, sales team, and customers.

## Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with nursery theme
- **Database:** Supabase (PostgreSQL) - Project: lzrtzgfzcpsgqbjhgkqg
- **Auth:** Supabase Auth + custom PIN authentication
- **Hosting:** Vercel (vercel.app subdomain)
- **Version Control:** GitHub (greenhousemanagement/greenhouse-inventory)
- **AI:** OpenAI GPT-4 integration (future phase)
- **PWA:** Mobile-responsive, installable

## Color Palette
- Primary: Green #10B981 (energetic, growth-focused)
- Secondary: Pink #EC4899 (product highlights)
- Accent: Purple #8B5CF6 (premium/features)
- Neutral: Dark #0F172A (light mode: #F8FAFC)
- Muted: Gray #64748B (secondary text/borders)

## User Roles & Permissions

### 1. Admin
- **Access:** Full control over all sections
- **PIN:** 8899 (configurable)
- **Capabilities:**
  - Manage raw material categories (Add/Update/Delete)
  - Manage products (specifications, box counts, raw rates, seller details)
  - Track expenses (electricity, gas, salaries, rent, other)
  - Generate reports (daily/weekly/monthly/quarterly/half-yearly/yearly)
  - PDF export with graphics and charts
  - Google Drive document upload
  - Business overview dashboard
  - Customer management (Add/Update/Delete)
  - View all orders and user activities

### 2. Packaging Team
- **Example User:** kedar
- **Access:** Product stock management
- **Capabilities:**
  - View admin-created categories and products
  - Update current stock levels
  - Fill product specifications and details
  - Set ready-for-shipping dates
  - Set tentative arrival/destination dates

### 3. Sales Team
- **Example User:** kaustubh
- **Access:** Stock management and order processing
- **Capabilities:**
  - View stock uploaded by packaging team
  - Update prices as per market rates
  - Record/Add/Update/Delete purchase orders
  - Manage customers (name, ID, login/password, phone, email)
  - Select customer + products + quantities
  - Generate invoices
  - Automatic inventory adjustment (reduce on sale, re-add on cancel)
  - Order status tracking: open → acknowledged → in_transit → completed → canceled
  - Special orders with specific delivery dates/times
  - Advance payment (lump sum) booking

### 4. Customers
- **Access:** Order placement and tracking
- **Capabilities:**
  - Browse available stock
  - Place orders against available inventory
  - Check order status
  - Download invoices
  - Special orders with specific delivery dates/times
  - Advance payment (lump sum) for booking
  - Balance payment at delivery

## Database Schema (Supabase)

### Tables Created
1. **profiles** - User roles and PIN management
2. **categories** - Raw material product categories
3. **products** - Product inventory with specifications
4. **orders** - Customer and internal orders with status tracking
5. **expenses** - Business expenses tracking

### Key Relationships
- profiles.id → auth.users.id (one-to-one)
- products.category_id → categories.id (many-to-one)
- orders.product_id → products.id (many-to-one)
- orders.customer_id → auth.users.id (many-to-one, optional)

## Development Phases

### Phase 1: Foundation (Complete)
- Next.js 14 project initialized
- Supabase integration configured
- GitHub repository set up
- Tailwind CSS with nursery theme

### Phase 2: Authentication (Complete)
- Admin PIN auth (8899) implemented
- Supabase RLS policies configured
- Multi-role system ready

### Phase 3: Admin Core (In Progress)
- Raw material categories CRUD
- Products CRUD with full specifications
- Expense tracking system
- Report generation framework

### Phase 4: Multi-User Sections
- Packaging team interface
- Sales team interface
- Customer-facing portal

### Phase 5: AI & Automation
- Price suggestions
- Report AI summaries
- Inventory alerts

### Phase 6: Deployment & PWA
- Vercel deployment
- Mobile responsiveness
- Google Workspace integration
- Backup verification

## Key Features Checklist

### ✅ Core Features
- [x] Multi-role authentication (admin/ packaging/ sales/ customer)
- [x] PIN-protected admin section
- [x] Raw material category management
- [x] Product inventory with specifications
- [x] Box count and items per box tracking
- [x] Market raw rate tracking
- [x] Seller code and contact details
- [ ] Expense tracking (electricity, gas, salaries, rent)
- [ ] Report generation (daily/weekly/monthly/quarterly/half-yearly/yearly)
- [ ] PDF export with graphics
- [ ] Google Drive integration
- [ ] Business overview dashboard
- [ ] Customer management

### 📦 Packaging Team Features
- [ ] Login interface
- [ ] View admin categories/products
- [ ] Update stock levels
- [ ] Fill product details
- [ ] Set shipping dates

### 💰 Sales Team Features
- [ ] Login interface
- [ ] View packaged stock
- [ ] Market price updates
- [ ] Order management (CRUD)
- [ ] Customer management
- [ ] Invoice generation
- [ ] Automatic inventory adjustment
- [ ] Order status workflow
- [ ] Special orders with delivery scheduling

### 🛒 Customer Features
- [ ] Login/Register
- [ ] Browse available stock
- [ ] Place orders
- [ ] Order status tracking
- [ ] Invoice download
- [ ] Special orders
- [ ] Advance payment booking

### 📊 AI & Analytics
- [ ] AI price suggestions
- [ ] Report summarization
- [ ] Inventory alerts
- [ ] Trend analysis

### 🚀 Deployment
- [ ] Vercel hosting
- [ ] Mobile-responsive/PWA
- [ ] Google Workspace integration
- [ ] GitHub backup
- [ ] Version tracking

## Commands & Scripts

### Development
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Lint code
```

### Supabase Setup
- Environment variables in `.env.local`:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY

### Git Workflow
```bash
git add .
git commit -m "description of changes"
git push origin master
```

## Next Immediate Steps

1. **This Week:** Complete admin CRUD for categories and products
2. **Next Week:** Build packaging team and sales team interfaces
3. **Week 3:** Implement customer order flow
4. **Week 4:** Add expense tracking and report generation
5. **Week 5:** AI features and optimization
6. **Week 6:** Vercel deployment and PWA setup
7. **Week 7:** Go-live and user testing

## Contact & Support
- **Gmail:** greenhousemanagement1@gmail.com (Google Drive integration)
- **Supabase Project:** lzrtzgfzcpsgqbjhgkqg (greenhousemanagement's Project)
- **GitHub:** https://github.com/greenhousemanagement/greenhouse-inventory
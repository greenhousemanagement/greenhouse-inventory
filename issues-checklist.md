# GreenHouse Project - Issues Checklist & Fixes

## Common Issues & Solutions

### 1. Supabase Connection Issues
**Symptoms:** API routes returning errors, console showing connection errors
**Fix:** 
- Verify environment variables in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- The provided keys should work with project `lzrtzgfzcpsgqbjhgkqg`

### 2. TypeScript Compilation Errors
**Symptoms:** Build failures, red underlines in VS Code
**Fix:** 
- Ensure all imports are correct
- Check that `@supabase/supabase-js` is installed (`npm install @supabase/supabase-js`)
- Verify TypeScript config includes proper paths

### 3. API Route Not Found
**Symptoms:** 404 errors when accessing `/api/admin/categories` etc.
**Fix:**
- Ensure API routes are in correct location: `src/app/api/admin/categories/route.ts`
- Next.js App Router requires files in `app/` directory
- Restart dev server after creating new route files

### 4. CORS / Fetch Issues
**Symptoms:** Frontend can't reach API routes
**Fix:**
- Next.js App Router APIs are server-side only
- Use relative paths like `/api/admin/categories` (starts from root)
- No CORS config needed for same-origin requests

### 5. Database Tables Not Found
**Symptoms:** "Table 'public.categories' doesn't exist"
**Fix:**
- SQL schema must be applied to Supabase project
- Go to Supabase Dashboard → SQL Editor
- Run the SQL script that was provided earlier
- Or check if schema was applied during initial setup

### 6. Admin Authentication Issues
**Symptoms:** PIN 8899 not working, "Invalid PIN" errors
**Fix:**
- Admin auth tries Supabase first, then falls back to PIN 8899
- If Supabase is configured but admin not in profiles table, it falls back to hardcoded PIN
- Ensure PIN form submits as JSON: `{ pin: "8899" }`

### 7. Form Data Not Saving
**Symptoms:** Add category/product shows success but doesn't persist
**Fix:**
- Check browser console for SQL errors
- Verify category/product name is not empty
- Ensure form submission uses correct method (POST/PUT)
- Check API route returns `success: true`

### 8. Categories/Products List Empty
**Symptoms:** UI shows "No categories found" or table is empty
**Fix:**
- This is normal if no data has been added yet
- Use the API to add first category/product
- Or check if Supabase has the SQL tables and data

## Current Implementation Status

### ✅ Working APIs
- `/api/admin/auth` - PIN authentication
- `/api/admin/categories` - Full CRUD
- `/api/admin/products` - Full CRUD with specifications

### ✅ Working UI Pages
- `/admin` - Dashboard with tabs
- `/admin/categories` - Categories management
- `/admin/products` - Products management

### ⚠️ Known Issues
1. **No sample data** in Supabase tables yet
2. **No validation** on form inputs (basic implementation)
3. **No PDF reports** generated yet
4. **No multi-user** (packaging/sales/customer) sections
5. **Google Drive integration** not started
6. **AI features** not implemented

## How to Test & Verify

### Step 1: Start the Application
```bash
npm run dev
```
Visit: `http://localhost:3000/admin`

### Step 2: Login
- Enter PIN: `8899`
- Should redirect to dashboard

### Step 3: Test Categories
1. Go to "Categories" tab
2. Add a new category (e.g., "Flowers")
3. Should appear in the list
4. Try editing/deleting

### Step 4: Test Products
1. Go to "Products" tab
2. Select a category from dropdown
3. Add a new product with specifications
4. Should appear in the list

### Step 5: Check Browser Console
- Look for any Supabase error messages
- Verify API calls are returning success responses

## If You Encounter Issues

**Please tell me:**
1. What error message you're seeing
2. Which page/feature you're trying to use
3. What you expected to happen
4. Any screenshot if possible

**Common fixes I can help with:**
- Fix API route configurations
- Add validation to forms
- Handle Supabase connection errors
- Improve UI feedback/messages
- Add sample data setup

---

**What specific issue would you like me to fix first?**

1. Supabase connection/authentication
2. API route errors
3. UI/frontend issues
4. Form validation
5. Data persistence
6. Something else?
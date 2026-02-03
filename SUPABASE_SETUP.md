# Supabase Setup for Contact Form

## Overview
The contact form integrates with Supabase to persist contact form submissions.

## Files Created

1. **`supabase-schema.sql`**
   - SQL schema for creating `contacts` table
   - Includes indexes for performance
   - Includes Row Level Security (RLS) policies

2. **`.env.local`**
   - Contains Supabase URL and anon/publishable key
   - This file is already in `.gitignore` (won't be committed)

3. **`src/app/api/contact/route.ts`**
   - Updated to insert contact submissions into Supabase
   - Returns success with contact ID
   - Added health check endpoint (GET /api/contact)
   - Comprehensive error logging

4. **`package.json`**
   - Added Vercel-specific scripts:
     - `vercel:env:check` - Verify environment variables
     - `vercel:build` - Local Vercel build test

## Setup Instructions

### Step 1: Run SQL Schema in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `staminaintl`
3. Go to **SQL Editor** or **Table Editor**
4. Open file: `supabase-schema.sql`
5. Run SQL script to create `contacts` table

⚠️ **Important:** Click "Run" ONCE and wait for it to complete before running again.

### Step 2: Configure Vercel Environment Variables (CRITICAL FOR FIXING 503 ERROR)

**Error 503 "Service Unavailable" occurs when Supabase environment variables are not properly set in Vercel.**

**To fix this:**

1. Go to: https://vercel.com/boris-penas-projects/staminaintl/settings/environment-variables
2. Click: "Environment Variables" section
3. Add the following variables:

| Name | Value | Environment |
|-------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fsdobcctowexkvzrsrma.supabase.co` | Production |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `sb_publishable_k01cNW8kyjQ_ooGleUxc8Q_-nJlD2af` | Production |

4. **IMPORTANT:** 
   - Make sure to select **Production** environment
   - Variables must match EXACTLY (copy-paste to avoid typos)
   - DO NOT include quotes or extra spaces
   - Click **"Save"** after adding variables

5. Vercel will automatically redeploy after saving environment variables

### Step 3: Test Contact Form Locally

1. Set environment variables locally (already in `.env.local`)
2. Start development server:
   ```bash
   bun run dev
   ```

3. Navigate to contact section on: http://localhost:3000#contact

4. Fill out form and submit

5. Check browser console and Vercel logs for any errors

### Step 4: Verify Data in Supabase

1. Go to **Table Editor** in Supabase Dashboard
2. Open `contacts` table
3. You should see submitted contact messages

## Troubleshooting 503 Service Unavailable Error

### Error Message:
```
Failed to load resource: the server responded with a status of 503 ()
```

### Root Causes:

1. **Supabase environment variables not set in Vercel**
   - Variables may be missing
   - Variables may have wrong values
   - Variables may be set in wrong environment (not Production)

2. **Variable names don't match exactly**
   - Must be: `NEXT_PUBLIC_SUPABASE_URL` (EXACT)
   - Must be: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (EXACT)
   - Case-sensitive
   - No typos

3. **Vercel not picking up environment variables**
   - Vercel requires variables to be set in Environment Variables section
   - Not in build command or vercel.json

4. **Supabase service issues**
   - Supabase may be temporarily down
   - Project may be suspended
   - Network restrictions

### Diagnostic Steps:

**1. Check Environment Variables:**
   Run locally to verify:
   ```bash
   bun run vercel:env:check
   ```
   Should return exit code 0 if variables are set

**2. Test Health Check Endpoint:**
   ```bash
   curl http://localhost:3000/api/contact
   ```
   Should see:
   ```json
   {
     "status": "healthy",
     "database": "configured"
   }
   ```

**3. Check Vercel Logs:**
   - Go to Vercel Dashboard → Deployments
   - Click on failed deployment
   - View "Build Log" and "Function Logs"
   - Look for environment variable errors

**4. Verify Supabase Dashboard:**
   - Confirm project is active
   - Check API key status
   - Verify project URL matches Vercel config

### Solutions:

**Solution 1: Configure Environment Variables (REQUIRED)**

Go to: https://vercel.com/boris-penas-projects/staminaintl/settings/environment-variables

Add:
```
NEXT_PUBLIC_SUPABASE_URL=https://fsdobcctowexkvzrsrma.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_k01cNW8kyjQ_ooGleUxc8Q_-nJlD2af
```

Select Environment: **Production**

Click **"Save"**

**Solution 2: Use Health Check for Diagnosis**

The `/api/contact` endpoint now has a GET method for health checks:

Test locally:
```bash
curl http://localhost:3000/api/contact
```

Expected response:
```json
{
  "status": "healthy",
  "database": "configured",
  "environment": "production"
}
```

Test in production:
```bash
curl https://www.staminaintl.com/api/contact
```

If this returns error 503, environment variables are not properly set in Vercel.

**Solution 3: Verify Variable Names Exactly**

Copy-paste these EXACTLY:
- `NEXT_PUBLIC_SUPABASE_URL` (with underscore, ALL UPPERCASE)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (with underscore, ALL UPPERCASE)

NO extra spaces, NO quotes, NO typos.

## Database Schema

The `contacts` table has the following structure:

| Column | Type | Description |
|---------|------|-------------|
| `id` | UUID | Primary key, auto-generated |
| `name` | TEXT | Contact person name (required) |
| `company` | TEXT | Company name (optional) |
| `email` | TEXT | Email address (required) |
| `country` | TEXT | Country (optional) |
| `message` | TEXT | Message content (required) |
| `status` | TEXT | Status (default: 'new') |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

## API Endpoint

**URL:** `/api/contact`

**Methods:** 
- `GET` - Health check (returns status and database config)
- `POST` - Submit contact form

### Success Response:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "uuid-here"
  }
}
```

### Error Response (503):
```json
{
  "error": "Database not configured",
  "message": "Please configure Supabase environment variables in Vercel",
  "config": {
    "hasUrl": false,
    "hasKey": false,
    "isConfigured": false
  },
  "status": 503
}
```

## Security Notes

- ✅ Environment variables are in `.env.local` (not committed to Git)
- ✅ `.env.local` is in `.gitignore`
- ✅ Using anon/publishable key (safe for public usage)
- ✅ Row Level Security (RLS) policies are configured
- ⚠️ Never commit `.env.local` with real credentials to Git!

## Quick Fix Checklist

Before fixing 503 error:

- [ ] Supabase SQL schema executed in Supabase Dashboard
- [ ] Environment variables added to Vercel (Production environment)
- [ ] Verified variable names are EXACT
- [ ] Tested contact form locally successfully
- [ ] Health check returns `"database": "configured"`
- [ ] Ready to redeploy in Vercel

After fixing 503 error:

- [ ] Form submits successfully on production
- [ ] Contacts appear in Supabase contacts table
- [ ] No 503 errors in browser console

## Next Steps (After Fix)

- Create an admin dashboard to view contact submissions
- Add email notifications for new contacts
- Implement spam protection
- Add reCAPTCHA or similar bot protection
- Create analytics dashboard for contact form usage

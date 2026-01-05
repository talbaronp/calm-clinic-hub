# Quick Start Checklist ✅

Use this checklist to set up the email signup feature quickly.

## Prerequisites
- [ ] Supabase account created (https://supabase.com)
- [ ] Supabase project created

## Setup Steps

### 1. Database Setup
- [ ] Open Supabase SQL Editor
- [ ] Run the SQL from `supabase/migrations/001_create_early_access_signups.sql`
- [ ] Verify table `early_access_signups` exists in Table Editor

### 2. Get Credentials
- [ ] Go to Settings → API in Supabase
- [ ] Copy Project URL → `SUPABASE_URL`
- [ ] Copy service_role key → `SUPABASE_SERVICE_ROLE_KEY` (not anon key!)

### 3. Environment Variables
- [ ] Create `.env.local` file in project root
- [ ] Add `SUPABASE_URL=your-url-here`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY=your-key-here`
- [ ] Save the file

### 4. Test
- [ ] Run `npm run dev`
- [ ] Open http://localhost:5173
- [ ] Submit a test email via the signup modal
- [ ] Check Supabase Table Editor to see the email was saved

## Files You Need

1. **SQL Migration**: `supabase/migrations/001_create_early_access_signups.sql`
2. **Environment File**: `.env.local` (create this - not in git)

## Common Issues

❌ **"Missing environment variables"**
→ Create `.env.local` with both variables, restart dev server

❌ **"Database error"**
→ Check service_role key (not anon key), verify SQL migration ran

❌ **Email not saving**
→ Check browser console and terminal for errors

## Next Steps After Setup

Once everything works locally:
- Deploy to Vercel
- Add environment variables in Vercel dashboard
- Test in production


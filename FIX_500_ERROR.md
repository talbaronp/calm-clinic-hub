# Fix 500 Internal Server Error - Step by Step

You're getting a 500 error, which means the server (Vercel function) is failing. This is **almost certainly** because environment variables are missing in Vercel.

## Step 1: Check Vercel Function Logs (See the Actual Error)

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project: `calm-clinic-hub`
3. Click the **"Deployments"** tab at the top
4. Click on your **latest deployment** (the most recent one)
5. Click the **"Functions"** tab (at the top, next to "Overview", "Build Logs", etc.)
6. Look for `/api/early-access` in the list
7. Click on `/api/early-access`
8. You should see logs - look for error messages
9. **Common errors you might see:**
   - "Missing Supabase environment variables"
   - "SUPABASE_URL is not defined"
   - Database connection errors

## Step 2: Add Environment Variables in Vercel ⚠️ MOST LIKELY FIX

1. In Vercel dashboard, go to your project
2. Click **"Settings"** tab (top navigation)
3. Click **"Environment Variables"** in the left sidebar
4. Check if you see:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   
5. **If they're MISSING or WRONG:**

   **Add SUPABASE_URL:**
   - Click **"Add New"** button
   - **Key**: `SUPABASE_URL`
   - **Value**: `https://lmhaxmuljuzvpoaquwtk.supabase.co`
   - **Environments**: Check all three boxes:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development
   - Click **"Save"**

   **Add SUPABASE_SERVICE_ROLE_KEY:**
   - Click **"Add New"** button again
   - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaGF4bXVsanV6dnBvYXF1d3RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYzNDg2NSwiZXhwIjoyMDgzMjEwODY1fQ.SHx8BQALI1IpBICnGF5jGxUzrmvrTV5ta-KvOh4OuJ0`
   - **Environments**: Check all three boxes:
     - ☑️ Production
     - ☑️ Preview
     - ☑️ Development
   - Click **"Save"**

## Step 3: Redeploy Your Project (IMPORTANT!)

After adding environment variables, you MUST redeploy:

1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **three dots (⋯)** on the right
4. Click **"Redeploy"**
5. Make sure **"Use existing Build Cache"** is checked
6. Click **"Redeploy"** button
7. Wait for deployment to complete (2-3 minutes)

## Step 4: Test Again

1. Go to your website: `https://www.calmclinic.co`
2. Try submitting an email again
3. It should work now!

## Why This Happens

Environment variables are NOT automatically available in production. Even if you set them during initial setup, they need to be:
1. Added in Vercel Settings → Environment Variables
2. Enabled for the Production environment
3. Redeployed after adding them

The function code is trying to connect to Supabase but can't find the credentials, so it crashes with a 500 error.

## Quick Checklist

- [ ] Checked Vercel function logs (Step 1)
- [ ] Added SUPABASE_URL environment variable (Step 2)
- [ ] Added SUPABASE_SERVICE_ROLE_KEY environment variable (Step 2)
- [ ] Both variables enabled for Production environment
- [ ] Redeployed the project (Step 3)
- [ ] Tested email submission (Step 4)


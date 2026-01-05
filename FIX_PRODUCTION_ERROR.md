# Fix Production Email Submission Error

## Step-by-Step Troubleshooting

### Step 1: Check Environment Variables in Vercel ⚠️ MOST LIKELY ISSUE

1. Go to your Vercel dashboard
2. Click on your project (`calm-clinic-hub`)
3. Click **"Settings"** tab (top navigation)
4. Click **"Environment Variables"** in the left sidebar
5. Check if you see:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. **If they're missing or wrong:**
   - Click "Add New"
   - Add `SUPABASE_URL` with value: `https://lmhaxmuljuzvpoaquwtk.supabase.co`
   - Add `SUPABASE_SERVICE_ROLE_KEY` with your key
   - Make sure all three environments are checked (Production, Preview, Development)
   - Click "Save"
   - **Redeploy your project** (Go to Deployments → Click three dots on latest → Redeploy)

### Step 2: Check Vercel Function Logs

1. In Vercel dashboard, go to your project
2. Click **"Deployments"** tab
3. Click on your **latest deployment**
4. Click **"Functions"** tab at the top
5. Look for `/api/early-access` function
6. Click on it to see logs
7. Try submitting an email on your site
8. Check the logs for any error messages

### Step 3: Check Browser Console

1. Open your website: `https://www.calmclinic.co`
2. Press **F12** (or Cmd+Option+I on Mac) to open Developer Tools
3. Click **"Console"** tab
4. Try submitting an email
5. Look for any red error messages
6. Copy any errors you see

### Step 4: Test API Endpoint Directly

Try visiting this URL in your browser:
```
https://www.calmclinic.co/api/early-access
```

You should see an error (that's normal - it expects POST, not GET). If you see a 404, the API route isn't deployed.

## Common Errors and Solutions

### Error: "Internal server error" or 500 error
**Cause**: Environment variables not set or Supabase connection failed
**Fix**: Check Step 1 above - make sure environment variables are set correctly

### Error: 404 Not Found
**Cause**: API route not deployed
**Fix**: 
- Check that `api/early-access.ts` file is in your GitHub repository
- Redeploy in Vercel

### Error: CORS error
**Cause**: Domain configuration issue
**Fix**: Shouldn't happen since API is on same domain, but verify domain is correctly configured

### Error: Network error or connection failed
**Cause**: API endpoint not accessible
**Fix**: Check if the API route exists and is deployed correctly

## Quick Fix Checklist

- [ ] Environment variables set in Vercel (Production environment)
- [ ] Project redeployed after adding environment variables
- [ ] API route exists in repository (`api/early-access.ts`)
- [ ] Checked Vercel function logs for errors
- [ ] Checked browser console for errors
- [ ] Tested API endpoint directly


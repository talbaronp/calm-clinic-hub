# Troubleshooting Production API Issues

## Check These First:

1. **Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify `SUPABASE_URL` is set
   - Verify `SUPABASE_SERVICE_ROLE_KEY` is set
   - Make sure they're enabled for "Production" environment

2. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Click "Functions" tab
   - Look for `/api/early-access` function
   - Check for any error messages

3. **Check Browser Console:**
   - Open your website
   - Press F12 to open Developer Tools
   - Go to "Console" tab
   - Try submitting the form
   - Look for any error messages (red text)

4. **Test the API Directly:**
   - Visit: `https://www.calmclinic.co/api/early-access` (should show "Method not allowed" for GET)
   - Or use a tool like Postman to test POST requests


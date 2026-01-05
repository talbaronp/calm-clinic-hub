# Troubleshooting Production Email Submission Error

## Quick Checklist

1. **Check Environment Variables in Vercel**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
   - Make sure they're enabled for Production environment

2. **Check Vercel Function Logs**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Click "Functions" tab
   - Look for errors in the `/api/early-access` function logs

3. **Check Browser Console**
   - Open your website
   - Press F12 (or Cmd+Option+I on Mac)
   - Go to "Console" tab
   - Try submitting an email
   - Look for any error messages (red text)

4. **Test the API Directly**
   - Try calling: `https://www.calmclinic.co/api/early-access`
   - Should return an error (that's normal for GET request)
   - Or test with a tool like Postman/curl

## Common Issues

### Issue 1: Environment Variables Not Set
**Symptom**: API returns 500 error or "Internal server error"
**Fix**: Add environment variables in Vercel Settings → Environment Variables

### Issue 2: API Route Not Found
**Symptom**: 404 error when calling /api/early-access
**Fix**: Make sure `api/early-access.ts` file is in the repository and deployed

### Issue 3: CORS Error
**Symptom**: CORS error in browser console
**Fix**: Shouldn't happen since API is on same domain, but check if domain is configured correctly

### Issue 4: Supabase Connection Error
**Symptom**: Database errors in function logs
**Fix**: Verify Supabase credentials are correct and service role key has proper permissions


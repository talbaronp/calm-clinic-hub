# Deploy to Vercel and Connect GoDaddy Domain

Complete guide to deploy your app and connect your GoDaddy domain.

## Prerequisites

✅ Your code is already on GitHub: `https://github.com/talbaronp/calm-clinic-hub.git`  
✅ You have a GoDaddy domain  
✅ Supabase is set up and working

---

## Step 1: Deploy to Vercel

### 1.1 Sign up / Log in to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** (recommended, since your code is on GitHub)

### 1.2 Import Your Project

1. After logging in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find **"calm-clinic-hub"** and click **"Import"**

### 1.3 Configure Project Settings

Vercel should auto-detect Vite, but verify:

- **Framework Preset**: `Vite` (should be auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default)
- **Install Command**: `npm install` (default)

### 1.4 Add Environment Variables ⚠️ IMPORTANT

Before deploying, click **"Environment Variables"** and add:

**Variable 1:**
- **Key**: `SUPABASE_URL`
- **Value**: `https://lmhaxmuljuzvpoaquwtk.supabase.co`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaGF4bXVsanV6dnBvYXF1d3RrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzYzNDg2NSwiZXhwIjoyMDgzMjEwODY1fQ.SHx8BQALI1IpBICnGF5jGxUzrmvrTV5ta-KvOh4OuJ0`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### 1.5 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment to complete
3. You'll get a URL like: `https://calm-clinic-hub-xxxxx.vercel.app`

✅ **Test the deployment** - visit the URL and test the signup form!

---

## Step 2: Connect Your GoDaddy Domain

### 2.1 Add Domain in Vercel

1. In your Vercel project dashboard, go to **"Settings"** tab
2. Click **"Domains"** in the left sidebar
3. Click **"Add Domain"**
4. Enter your domain (e.g., `yourdomain.com`)
5. Click **"Add"**

### 2.2 Vercel Shows DNS Instructions

Vercel will show you what DNS records to add. It will look something like:

**Option A: If using root domain (`yourdomain.com`):**
- Type: `A Record`
- Name: `@`
- Value: `76.76.21.21` (Vercel will show the actual IP)

**Option B: If using www (`www.yourdomain.com`):**
- Type: `CNAME Record`
- Name: `www`
- Value: `cname.vercel-dns.com` (Vercel will show the actual value)

**📝 Copy these values - you'll need them in GoDaddy!**

---

## Step 3: Configure DNS in GoDaddy

### 3.1 Log in to GoDaddy

1. Go to https://www.godaddy.com
2. Click **"Sign In"** (top right)
3. Enter your credentials

### 3.2 Access DNS Settings

1. Go to **"My Products"**
2. Find your domain
3. Click the **"DNS"** button (or three dots → "DNS")

### 3.3 Add DNS Records

You'll see a list of existing DNS records. **Add the records Vercel showed you:**

#### For Root Domain (yourdomain.com):

1. Click **"Add"** to create a new record
2. Select **Type**: `A`
3. **Name/Host**: `@` (or leave blank, depending on GoDaddy's interface)
4. **Value/Points to**: Enter the IP address Vercel provided (e.g., `76.76.21.21`)
5. **TTL**: `600` (or default)
6. Click **"Save"**

#### For WWW (www.yourdomain.com):

1. Click **"Add"** again
2. Select **Type**: `CNAME`
3. **Name/Host**: `www`
4. **Value/Points to**: Enter the CNAME value Vercel provided (e.g., `cname.vercel-dns.com`)
5. **TTL**: `600` (or default)
6. Click **"Save"**

### 3.4 Remove Conflicting Records (if any)

If you see existing A records or CNAME records pointing to GoDaddy's default values, you can:
- Delete them, OR
- Edit them to point to Vercel's values

**⚠️ Don't delete**: MX records (for email), TXT records (for verification), or other important records.

---

## Step 4: Wait for DNS Propagation

1. Go back to Vercel dashboard → **Settings** → **Domains**
2. You'll see your domain status
3. It may show "Validating Configuration" or "Pending"
4. **Wait 5 minutes to 2 hours** for DNS to propagate
5. Status will change to "Valid" when ready

### Check DNS Status

You can check if DNS has propagated:
- Go to https://dnschecker.org
- Enter your domain
- Look for A record or CNAME records to verify

---

## Step 5: SSL Certificate (Automatic!)

✅ **Good news**: Vercel automatically provides SSL certificates (HTTPS)
- No additional configuration needed
- Your site will be accessible via `https://yourdomain.com`
- SSL is free and auto-renewing

---

## Step 6: Verify Everything Works

1. Visit your domain: `https://yourdomain.com`
2. Test the signup form
3. Verify emails are being saved to Supabase
4. Check that the API endpoint works: Try submitting an email

---

## Troubleshooting

### Domain shows "Invalid Configuration" in Vercel

- Double-check DNS records in GoDaddy match exactly what Vercel provided
- Wait longer (DNS can take up to 48 hours, usually 1-2 hours)
- Remove any conflicting DNS records

### Site not loading after DNS propagation

- Check Vercel deployment is successful
- Verify environment variables are set correctly
- Check browser console for errors

### API/Form not working after deployment

- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in Vercel
- Check Vercel function logs (Deployments → select deployment → Functions tab)
- Make sure the `api/early-access.ts` file was deployed

### Need to update DNS records

- GoDaddy: My Products → DNS → Edit/Delete records
- Vercel: Settings → Domains → Your domain → see current configuration

---

## Quick Reference: Your Current Setup

- **GitHub Repo**: https://github.com/talbaronp/calm-clinic-hub.git
- **Supabase URL**: https://lmhaxmuljuzvpoaquwtk.supabase.co
- **Vercel Project**: (will be created in Step 1)
- **Domain**: (your GoDaddy domain)

---

## Next Steps After Deployment

1. ✅ Test the signup form on your live domain
2. ✅ Monitor signups in Supabase Table Editor
3. ✅ Share your domain with users
4. ✅ Set up analytics (optional)
5. ✅ Configure custom email (optional)

Good luck with your deployment! 🚀


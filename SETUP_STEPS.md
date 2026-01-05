# Step-by-Step Setup Guide

Follow these steps to get your early access email signup feature working.

## Step 1: Create a Supabase Account (if you don't have one)

1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub, Google, or email
4. Verify your email if needed

## Step 2: Create a New Supabase Project

1. Once logged in, click **"New project"**
2. Fill in the project details:
   - **Organization**: Select or create one
   - **Name**: e.g., "calm-clinic-hub" or any name you prefer
   - **Database Password**: Create a strong password (save it somewhere safe)
   - **Region**: Choose the closest region to your users
3. Click **"Create new project"**
4. Wait 1-2 minutes for the project to be created

## Step 3: Create the Database Table

1. In your Supabase project dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `supabase/migrations/001_create_early_access_signups.sql` from this project
4. Copy ALL the SQL code from that file
5. Paste it into the SQL Editor in Supabase
6. Click **"Run"** (or press Ctrl/Cmd + Enter)
7. You should see a success message: "Success. No rows returned"

## Step 4: Get Your Supabase Credentials

1. In your Supabase project dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** under Project Settings
3. Find the **"Project URL"** section:
   - Copy the URL (it looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - This is your `SUPABASE_URL`
4. Scroll down to **"Project API keys"** section:
   - Find the **"service_role"** key (NOT the anon key!)
   - Click the eye icon to reveal it, then click **"Copy"**
   - This is your `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ **Important**: Keep this key secret! Never commit it to git or expose it publicly.

## Step 5: Set Up Environment Variables Locally

1. In your project root directory (`/Users/talbar-on/Documents/Projects/calm-clinic-hub`), create a file named `.env.local`
2. Add the following content (replace with your actual values):

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

3. Replace `https://your-project-id.supabase.co` with your actual Project URL from Step 4
4. Replace `your-service-role-key-here` with your actual service_role key from Step 4
5. Save the file

**Example:**
```env
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjE2MjM5MDIyfQ.example_key_here
```

## Step 6: Verify the Table Was Created

1. In Supabase dashboard, click **"Table Editor"** in the left sidebar
2. You should see a table named `early_access_signups`
3. Click on it to view the table structure
4. The table should have these columns: id, email, created_at, source, utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer, user_agent

## Step 7: Test the Implementation Locally

1. Make sure your development server is running. If not, open a terminal and run:
   ```bash
   cd /Users/talbar-on/Documents/Projects/calm-clinic-hub
   npm run dev
   ```

2. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal)

3. Find and click the signup button/modal on your landing page

4. Enter a test email address (use your own email to test)

5. Click submit

6. You should see a success message: "תודה! נעדכן אותך בקרוב." (Thank you! We'll update you soon.)

## Step 8: Verify the Email Was Stored

1. Go back to your Supabase dashboard
2. Click **"Table Editor"** in the left sidebar
3. Click on the `early_access_signups` table
4. You should see your test email in the table with:
   - A UUID in the `id` column
   - Your email in the `email` column
   - Current timestamp in `created_at`
   - "landing_modal" in the `source` column

## Step 9: Test Duplicate Prevention

1. Try submitting the same email again from your landing page
2. You should see: "את/ה כבר רשום/ה 🙂" (You're already registered 🙂)
3. In Supabase, you should still see only one entry for that email

## Step 10: Set Up for Production (When Deploying to Vercel)

When you're ready to deploy to Vercel:

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore` - it should be by default)

2. In Vercel:
   - Go to your project settings
   - Click **"Environment Variables"**
   - Add:
     - **Key**: `SUPABASE_URL`
     - **Value**: Your Supabase project URL
     - **Environments**: Select Production, Preview, and Development
   - Add:
     - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
     - **Value**: Your service role key
     - **Environments**: Select Production, Preview, and Development
   - Click **"Save"**

3. Redeploy your application

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env.local` exists in the project root
- Check that both `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- Make sure there are no extra spaces or quotes around the values
- Restart your development server after creating/editing `.env.local`

### "Database error" or emails not saving
- Verify the SQL migration ran successfully (Step 3)
- Double-check your service role key is correct (not the anon key!)
- Check the terminal/console for detailed error messages
- Verify the table exists in Supabase Table Editor

### Can't see the table in Supabase
- Make sure you ran the SQL migration (Step 3)
- Check if there were any errors when running the SQL
- Try refreshing the Table Editor page

### API endpoint not working
- Make sure you're running `npm run dev` (not just opening the HTML file)
- Check that the API route file exists at `api/early-access.ts`
- For Vercel: Make sure you've deployed the `api/` folder

## Need Help?

- Check the `SUPABASE_SETUP.md` file for more detailed information
- Review the error messages in your browser console (F12) and terminal
- Verify all steps were completed in order


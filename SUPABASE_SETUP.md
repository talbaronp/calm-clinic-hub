# Supabase Setup Guide

This guide explains how to set up the early access email signup feature with Supabase.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Step 1: Create the Database Table

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the migration script from `supabase/migrations/001_create_early_access_signups.sql`

Alternatively, you can copy and paste the SQL:

```sql
-- Create early_access_signups table
CREATE TABLE IF NOT EXISTS early_access_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'landing_modal',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer text,
  user_agent text
);

-- Create unique index on lower(email) for case-insensitive uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS idx_early_access_signups_email_lower 
ON early_access_signups (lower(email));

-- Enable Row Level Security
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;

-- Deny all public access (no client-side inserts allowed)
CREATE POLICY "Deny all public access" ON early_access_signups
  FOR ALL
  USING (false)
  WITH CHECK (false);
```

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy your **Project URL** (this is your `SUPABASE_URL`)
3. Copy your **service_role** key (this is your `SUPABASE_SERVICE_ROLE_KEY`)
   - **⚠️ Important**: The service role key has admin privileges. Never expose it to the client side.

## Step 3: Set Environment Variables

### For Local Development

Create a `.env.local` file in the project root:

```env
SUPABASE_URL=your-project-url-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### For Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following variables:
   - `SUPABASE_URL` = your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key

## Step 4: Verify the Setup

1. Start your development server: `npm run dev`
2. Open the signup modal on your landing page
3. Submit a test email
4. Check your Supabase table to verify the email was stored:
   - Go to **Table Editor** in Supabase dashboard
   - Select the `early_access_signups` table
   - You should see your test email

## Security Notes

- **Row Level Security (RLS)** is enabled on the table
- All public access is denied (the policy prevents client-side inserts)
- Only server-side code (using the service role key) can insert records
- The service role key should **never** be committed to git or exposed to the client

## API Endpoint

The API endpoint is available at: `POST /api/early-access`

**Request body:**
```json
{
  "email": "user@example.com",
  "utm_source": "optional",
  "utm_medium": "optional",
  "utm_campaign": "optional",
  "utm_content": "optional",
  "utm_term": "optional"
}
```

**Response (201 Created):**
```json
{
  "status": "ok"
}
```

**Response (200 OK - already registered):**
```json
{
  "status": "already_registered"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Email is required" // or "Invalid email format"
}
```

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env.local` exists and contains both `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Restart your development server after adding environment variables

### Emails not being stored
- Check that the migration SQL was executed successfully
- Verify your service role key is correct
- Check the server logs for error messages
- Ensure RLS policies allow service role access (they should by default)

### Duplicate email errors
- The system handles duplicates gracefully and returns "already_registered" status
- The unique index ensures case-insensitive email uniqueness


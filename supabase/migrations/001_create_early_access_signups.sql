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
-- Service role key will be used server-side only
CREATE POLICY "Deny all public access" ON early_access_signups
  FOR ALL
  USING (false)
  WITH CHECK (false);


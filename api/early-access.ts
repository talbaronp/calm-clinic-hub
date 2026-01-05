import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/early-access
 * 
 * Endpoint for early access email signups.
 * Stores emails in Supabase with validation and deduplication.
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const { email, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = req.body;

    // Validate email exists
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Trim and normalize email
    const trimmedEmail = String(email).trim();
    const normalizedEmail = trimmedEmail.toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get User-Agent from request headers
    const userAgent = req.headers['user-agent'] || null;
    const referrer = req.headers['referer'] || req.headers['referrer'] || null;

    // Create Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return res.status(500).json({ error: 'Internal server error' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Check if email already exists (using the unique index on lower(email))
    const { data: existing, error: checkError } = await supabase
      .from('early_access_signups')
      .select('id')
      .eq('email', normalizedEmail)
      .limit(1)
      .maybeSingle();

    // If email already exists, return already_registered status
    if (existing) {
      return res.status(200).json({ status: 'already_registered' });
    }

    // Insert new record
    const { error: insertError } = await supabase
      .from('early_access_signups')
      .insert({
        email: normalizedEmail,
        source: 'landing_modal',
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_content: utm_content || null,
        utm_term: utm_term || null,
        referrer: referrer ? String(referrer).substring(0, 500) : null,
        user_agent: userAgent ? String(userAgent).substring(0, 500) : null,
      });

    if (insertError) {
      // Check if it's a unique constraint violation (race condition case)
      if (insertError.code === '23505' || insertError.message?.includes('unique')) {
        return res.status(200).json({ status: 'already_registered' });
      }
      
      // Log error without exposing sensitive data
      console.error('Database error:', insertError.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Success
    return res.status(201).json({ status: 'ok' });
  } catch (error) {
    // Log error without exposing sensitive data
    console.error('Unexpected error:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ error: 'Internal server error' });
  }
}


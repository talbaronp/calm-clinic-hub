/**
 * Frontend API helper for early access signups
 */

export interface EarlyAccessRequest {
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export interface EarlyAccessResponse {
  status: 'ok' | 'already_registered' | 'error';
  error?: string;
}

/**
 * Submit email for early access signup
 * 
 * @param email - Email address to sign up
 * @param utmParams - Optional UTM tracking parameters
 * @returns Response with status and optional error message
 */
export async function submitEarlyAccess(
  email: string,
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  }
): Promise<EarlyAccessResponse> {
  try {
    const response = await fetch('/api/early-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        ...utmParams,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: 'error',
        error: data.error || 'משהו השתבש, אפשר לנסות שוב.',
      };
    }

    return data as EarlyAccessResponse;
  } catch (error) {
    console.error('Error submitting early access:', error);
    return {
      status: 'error',
      error: 'משהו השתבש, אפשר לנסות שוב.',
    };
  }
}

/**
 * Get Hebrew message for early access response status
 */
export function getEarlyAccessMessage(status: EarlyAccessResponse['status']): string {
  switch (status) {
    case 'ok':
      return 'תודה! נעדכן אותך בקרוב.';
    case 'already_registered':
      return 'את/ה כבר רשום/ה 🙂';
    case 'error':
      return 'משהו השתבש, אפשר לנסות שוב.';
    default:
      return 'משהו השתבש, אפשר לנסות שוב.';
  }
}

/**
 * Extract UTM parameters from current URL
 */
export function getUTMParamsFromURL(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
} {
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const utmParams: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  } = {};

  const utm_source = params.get('utm_source');
  const utm_medium = params.get('utm_medium');
  const utm_campaign = params.get('utm_campaign');
  const utm_content = params.get('utm_content');
  const utm_term = params.get('utm_term');

  if (utm_source) utmParams.utm_source = utm_source;
  if (utm_medium) utmParams.utm_medium = utm_medium;
  if (utm_campaign) utmParams.utm_campaign = utm_campaign;
  if (utm_content) utmParams.utm_content = utm_content;
  if (utm_term) utmParams.utm_term = utm_term;

  return utmParams;
}


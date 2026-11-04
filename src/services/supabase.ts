import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabasePublishableKey) {
    return false;
  }
  // Check that the URL is a valid URL shape and not just an unreplaced placeholder
  if (
    supabaseUrl.includes('your-project') ||
    supabaseUrl.includes('placeholder') ||
    (!supabaseUrl.startsWith('https://') && !supabaseUrl.startsWith('http://'))
  ) {
    return false;
  }
  if (supabasePublishableKey.includes('placeholder') || supabasePublishableKey.length < 10) {
    return false;
  }
  return true;
};

export const getSupabaseConfigError = (): string | null => {
  if (isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseUrl && !supabasePublishableKey) {
    return 'Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY) are missing. Please configure your .env file.';
  }
  if (!supabaseUrl) {
    return 'Missing VITE_SUPABASE_URL in your environment.';
  }
  if (!supabasePublishableKey) {
    return 'Missing VITE_SUPABASE_PUBLISHABLE_KEY in your environment.';
  }
  return 'Invalid Supabase environment variables. Please provide a valid project URL and publishable key.';
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabasePublishableKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

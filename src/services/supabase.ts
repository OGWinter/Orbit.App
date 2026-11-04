import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseAnonKey) {
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
  if (supabaseAnonKey.includes('placeholder') || supabaseAnonKey.length < 10) {
    return false;
  }
  return true;
};

export const getSupabaseConfigError = (): string | null => {
  if (isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseUrl && !supabaseAnonKey) {
    return 'Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are missing. Please configure your .env file.';
  }
  if (!supabaseUrl) {
    return 'Missing VITE_SUPABASE_URL in your environment.';
  }
  if (!supabaseAnonKey) {
    return 'Missing VITE_SUPABASE_ANON_KEY in your environment.';
  }
  return 'Invalid Supabase environment variables. Please provide a valid project URL and anon public key.';
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

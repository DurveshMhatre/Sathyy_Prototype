import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize the Supabase client
// For SSR safety, we only initialize it if the URL and Key are provided.
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper to check if Supabase is properly configured.
 * Useful for displaying fallback notices/warnings in UI components.
 */
export function isSupabaseConfigured() {
  return !!supabase;
}

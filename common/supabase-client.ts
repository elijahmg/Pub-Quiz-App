import { createClient } from '@supabase/supabase-js';

export default function createSupabaseClient() {
  return createClient(String(process.env.SHADOW_DATABASE_URL), '', {});
}

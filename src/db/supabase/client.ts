import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { Database } from '@/db/supabase/supabase'

export function createClient(): ReturnType<typeof createServerClient<Database>> {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

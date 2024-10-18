'use server'

import { createClient } from '@/db/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Signs in the user with GitHub.
 * @returns A redirect to the GitHub authorization URL.
 * @throws {Error} If there is an error signing in with GitHub.
 */
export const signInViaGithub = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(`Error signing in with Github: ${error.message}`)
  }

  return redirect(data.url)
}

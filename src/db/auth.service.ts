'use server'

import { createClient } from '@/db/supabase/server'
import { revalidatePath } from 'next/cache'

export async function loginViaMagicLink(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error

  return { data }
}

export async function logOut() {
  const supabase = createClient()

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}

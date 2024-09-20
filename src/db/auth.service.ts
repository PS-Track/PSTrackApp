'use server'

import { createClient } from '@/db/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Sign up a new user with their email and password.
 * @param email The user's email.
 * @param password The user's password.
 **/
export async function signUpViaEmailAndPassword(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  return { data }
}

export async function logOut() {
  const supabase = createClient()

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}

export async function loginViaMagicLink(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error

  return { data }
}

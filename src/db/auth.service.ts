'use server'

import { createClient } from '@/db/supabase/server'
import { revalidatePath } from 'next/cache'
import { UserAttributes } from '@supabase/auth-js'

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

/**
 * Log in a user with their email and password.
 * @param email The user's email.
 * @param password The user's password.
 **/
export async function loginViaEmailAndPassword(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error

  return { data }
}

/**
 * Log out the currently authenticated user.
 **/
export async function logOut() {
  const supabase = createClient()

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
}

// interface UpdateUserInfoData {
//   _email?: string
//   _phone_number?: string
//   _full_name?: string
//   _first_name?: string
//   _last_name?: string
//   _avatar_url?: string
// }

// export async function updateUserInfo({ _first_name, _last_name, _avatar_url }: UpdateUserInfoData) {
//   const supabase = createClient()
//   let updateData: UserAttributes = {}
// }

export async function loginViaMagicLink(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error

  return { data }
}

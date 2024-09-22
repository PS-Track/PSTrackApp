'use server'

import { createClient } from '@/db/supabase/server'
import { revalidatePath } from 'next/cache'

import { UserMetadataI } from '@/types/User.interface'

/**
 * Sign up a new user with their email and password.
 * @param email The user's email.
 * @param password The user's password.
 **/
export async function signUpViaEmailAndPassword(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) throw error

  // create is_first_login field in user_metadata
  if (data?.user?.id) {
    const { error: updateError } = await supabase.auth.admin.updateUserById(data?.user?.id, {
      user_metadata: {
        is_first_login: true,
      },
    })

    if (updateError) throw updateError
  }
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

/**
 * Update the user metadata for a user.
 * @param userId The user's ID.
 * @param userMetaData The user metadata to update.
 **/
export async function updateUserMetadata(userId: string, userMetaData: UserMetadataI) {
  const supabase = createClient()
  const full_name = `${userMetaData.first_name ?? ''} ${userMetaData.last_name ?? ''}`.trim()

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...userMetaData,
      full_name: full_name || undefined,
      is_first_login: true,
    },
  })
  if (error) throw error

  // update is_first_login field in user_metadata to false
  if (data?.user?.id) await updateUserFirstLogin(data?.user?.id, false)
  return { data }
}

/**
 * Update the user's first login status.
 * @param userId The user's ID.
 * @param isFirstLogin Whether the user has logged in before.
 **/
export async function updateUserFirstLogin(userId: string, isFirstLogin: boolean) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      is_first_login: isFirstLogin,
    },
  })
  if (error) throw error

  return { data }
}

export async function loginViaMagicLink(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error

  return { data }
}

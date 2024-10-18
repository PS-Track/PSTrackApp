'use server'

import { createClient } from '@/db/supabase/server'
import { revalidatePath } from 'next/cache'

import { UpdateUserDataI, UserMetadataI } from '@/types/User.interface'

/**
 * Sign up a new user with their email and password.
 * @param email The user's email.
 * @param password The user's password.
 **/
export async function register(email: string, password: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          is_first_login: true,
          display_name: '',
          username: '',
          phone: '',
          avatar: '',
          bio: '',
          linkedIn: '',
          twitter: '',
          github: '',
          website: '',
        },
      },
    })
    if (error) throw error

    return { data }
  } catch (error) {
    console.error('register', error)
    throw error
  }
}

/*****************************************************************************************************************/
/**
 * Log in a user with their email and password.
 * @param email The user's email.
 * @param password The user's password.
 **/
export async function login(email: string, password: string) {
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

export async function updateUserFirstLogin({
  userId,
  userData,
}: {
  userId: string
  userData: UpdateUserDataI
}) {
  const supabase = createClient()

  const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...userData,
      is_first_login: false,
    },
  })
  // const { error: updateError } = await supabase
  //   .from('users')
  //   .update({
  //     display_name: userData.display_name,
  //     username: userData.username,
  //     phone: userData.phone,
  //   })
  //   .eq('id', userId)
  if (updateError) throw new Error('Failed to update user data')

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      is_first_login: false,
    },
  })
  if (error) throw new Error('Failed to updateUserFirstLogin')

  return { data }
}

// todo: update the 'updateUseMetadata' function to use the 'updateUserMetadataAsync' action
/**
 * Update the user metadata for a user.
 * @param userId The user's ID.
 * @param userMetaData The user metadata to update.
 **/
export async function updateUserMetadata(userId: string, userMetaData: UserMetadataI) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: {
      ...userMetaData,
      is_first_login: false,
    },
  })
  if (error) throw error

  return { data }
}

// todo
export async function loginViaMagicLink(email: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOtp({ email })
  if (error) throw error

  return { data }
}

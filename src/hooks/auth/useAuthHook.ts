import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useDialogHook } from '@/hooks/generic/useDialogHook'
import { UserMetadataI } from '@/types/User.interface'
import { createClient } from '@/db/supabase/client'

import {
  setUser,
  setSession,
  logoutAsync,
  updateUserInfoAsync,
  loginViaEmailAndPasswordAsync,
  siginUpWithEmailAndPasswordAsync,
} from '@/store/slices/authSlice'

export const useAuthHook = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)
  const { openDialog, closeDialog } = useDialogHook()

  // Ref to ensure the auth listener is only set up once
  const hasSetupListener = useRef(false)

  /**
   * Set up an auth listener to update the Redux store with the latest user data
   **/
  useEffect(() => {
    // If the listener is already set up, do nothing
    if (hasSetupListener.current) return

    const supabase = createClient()

    // Set up a listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      // Update the session in the Redux store
      dispatch(setSession(session))
      if (session) {
        // If a session exists, fetch the latest user data
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
        } else {
          // Update the user in the Redux store
          dispatch(setUser(user ?? null))
        }
      } else {
        // If no session exists, set the user to null
        dispatch(setUser(null))
      }
    })

    // Get the current session on component mount
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      // Update the session in the Redux store
      dispatch(setSession(session))
      if (session) {
        // Fetch the latest user data if a session exists
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
        } else {
          // Update the user in the Redux store
          dispatch(setUser(user ?? null))
        }
      } else {
        // Set the user to null if no session exists
        dispatch(setUser(null))
      }
    })

    // Mark that the listener has been set up
    hasSetupListener.current = true
    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => authListener?.subscription?.unsubscribe()
  }, [dispatch])

  /**
   * Open the dialog if the user is logging in for the first time
   **/
  useEffect(() => {
    if (user?.user_metadata?.is_first_login) openDialog()
    else closeDialog()
  }, [closeDialog, openDialog, user?.user_metadata?.is_first_login])

  /**
   * Handle user registration with email and password
   **/
  const handleRegister = async (email: string, password: string) => {
    const res = await dispatch(
      siginUpWithEmailAndPasswordAsync({
        email,
        password,
      })
    )

    if (siginUpWithEmailAndPasswordAsync.fulfilled.match(res)) {
      router.push('/')
    } else if (siginUpWithEmailAndPasswordAsync.rejected.match(res)) {
      throw new Error(res.error.message)
    }
  }

  /**
   * Handle user login with email and password
   **/
  const handleLoginViaEmailAndPassword = async (email: string, password: string) => {
    const res = await dispatch(
      loginViaEmailAndPasswordAsync({
        email,
        password,
      })
    )

    if (loginViaEmailAndPasswordAsync.fulfilled.match(res)) {
      router.push('/')
    } else if (loginViaEmailAndPasswordAsync.rejected.match(res)) {
      throw new Error(res.error.message)
    }
  }

  /**
   * Handle user logout
   **/
  const handleLogOut = async () => {
    await dispatch(logoutAsync())
    router.push('/auth')
  }

  /**
   * Handle updating user metadata
   **/
  const handleUpdateUserMetadata = async (userId: string, userMetaData: UserMetadataI) => {
    console.log('dispatching updateUserInfoAsync', userId, userMetaData)
    await dispatch(
      updateUserInfoAsync({
        userId,
        userInfo: userMetaData,
      })
    )
      // Unwrap the action to get the result or throw an error
      .unwrap()
      .then(() => closeDialog())
  }

  return {
    user,
    isLoading,
    error,
    handleRegister,
    handleLoginViaEmailAndPassword,
    handleLogOut,
    handleUpdateUserMetadata,
  }
}

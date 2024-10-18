import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useDialogHook } from '@/hooks/global/useDialogHook'
import { createClient } from '@/db/supabase/client'

import {
  loginViaEmailAndPasswordAsync,
  logoutAsync,
  setSession,
  setUser,
  siginUpWithEmailAndPasswordAsync,
} from '@/store/slices/authSlice'
import { UpdateUserDataI } from '@/types/User.interface'
import { updateUserFirstLogin } from '@/db/auth.service'

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
    if (hasSetupListener.current) return

    const supabase = createClient()

    // Set up a listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      dispatch(setSession(session))
      if (session) {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
        } else {
          dispatch(setUser(user ?? null))
        }
      } else {
        dispatch(setUser(null))
      }
    })

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      dispatch(setSession(session))
      if (session) {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) {
          console.error('Error fetching user:', error)
        } else {
          dispatch(setUser(user ?? null))
        }
      } else {
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

    console.log('user', user) // todo remove this
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
   */
  const handleLogOut = async () => {
    await dispatch(logoutAsync())
    router.push('/auth')
  }

  /**
   * Update user metadata and set `is_first_login` to `false`
   * @param userId The user's ID
   * @param userData The user metadata to update
   */
  const handleUpdateUserFirstLogin = async (userId: string, userData: UpdateUserDataI) => {
    const { data } = await updateUserFirstLogin({ userId, userData })
    dispatch(setUser(data.user))
    console.log('handleUpdateUserFirstLogin', data)
  }

  return {
    user,
    isLoading,
    error,
    handleRegister,
    handleLoginViaEmailAndPassword,
    handleLogOut,
    handleUpdateUserFirstLogin,
  }
}

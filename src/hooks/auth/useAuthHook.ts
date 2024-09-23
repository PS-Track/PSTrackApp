import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useDialogHook } from '@/hooks/generic/useDialogHook'
import { UserMetadataI } from '@/types/User.interface'

import {
  loginViaEmailAndPasswordAsync,
  logoutAsync,
  setSession,
  setUser,
  siginUpWithEmailAndPasswordAsync,
  updateUserInfoAsync,
} from '@/store/slices/authSlice'
import { createClient } from '@/db/supabase/client'

export const useAuthHook = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)
  const { openDialog, closeDialog } = useDialogHook()

  const hasSetupListener = useRef(false)
  useEffect(() => {
    if (hasSetupListener.current) return

    const supabase = createClient()

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

    hasSetupListener.current = true
    return () => authListener?.subscription?.unsubscribe()
  }, [dispatch])

  useEffect(() => {
    if (user?.user_metadata?.is_first_login) openDialog()
    else closeDialog()
  }, [closeDialog, openDialog, user?.user_metadata?.is_first_login])

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

  const handleLogOut = async () => {
    await dispatch(logoutAsync())
    router.push('/auth')
  }

  const handleUpdateUserMetadata = async (userId: string, userMetaData: UserMetadataI) => {
    console.log('dispatching updateUserInfoAsync', userId, userMetaData)
    await dispatch(
      updateUserInfoAsync({
        userId,
        userInfo: userMetaData,
      })
    )
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

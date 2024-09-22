import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'

import {
  loginViaEmailAndPasswordAsync,
  logoutAsync,
  setSession,
  setUser,
  siginUpWithEmailAndPasswordAsync,
  updateUserInfoAsync,
} from '@/store/slices/authSlice'
import { createClient } from '@/db/supabase/client'
import { UserMetadataI } from '@/types/User.interface'

export const useAuthHook = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  const hasSetupListener = useRef(false)
  useEffect(() => {
    if (hasSetupListener.current) return

    const supabase = createClient()

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setSession(session))
      dispatch(setUser(session?.user ?? null))
      // todo handle first login
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session))
      dispatch(setUser(session?.user ?? null))
      if (session?.user.user_metadata.is_first_login) {
      }
    })

    hasSetupListener.current = true
  }, [dispatch])

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
    console.log('dispatching loginViaEmailAndPasswordAsync', email, password)
    const res = await dispatch(
      loginViaEmailAndPasswordAsync({
        email,
        password,
      })
    )

    if (loginViaEmailAndPasswordAsync.fulfilled.match(res)) {
      console.log('loginViaEmailAndPasswordAsync.fulfilled', res.payload.user)
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
    await dispatch(updateUserInfoAsync({ userId, userInfo: userMetaData }))
  }

  return {
    user,
    isLoading,
    error,
    handleRegister,
    handleLoginViaEmailAndPassword,
    handleLogOut,
  }

  // const handleLoginViaMagicLink = async (email: string) => {
  //   console.log('dispatching loginViaMagicLinkAsync', email)
  //   const res = await dispatch(loginViaMagicLinkAsync({ email }))
  //   console.log('dispatched loginViaMagicLinkAsync', res)
  //
  //   if (loginViaMagicLinkAsync.fulfilled.match(res)) {
  //     dispatch(setUser(res.payload.user))
  //     console.log('loginViaMagicLinkAsync.fulfilled', res.payload.user)
  //   }
  // }
  //
  // return {
  //   user,
  //   isLoading,
  //   error,
  //   handleLoginViaMagicLink,
  // }
}

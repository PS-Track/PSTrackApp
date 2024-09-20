import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logoutAsync, siginUpWithEmailAndPasswordAsync } from '@/store/slices/authSlice'

export const useAuthHook = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  const handleRegisterViaEmailAndPassword = async (email: string, password: string) => {
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

  const handleLogOut = async () => {
    await dispatch(logoutAsync())
    router.push('/auth')
  }

  return {
    user,
    isLoading,
    error,
    handleRegisterViaEmailAndPassword,
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

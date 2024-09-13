import { useAppDispatch, useAppSelector } from '@/store/hooks'

import { loginViaMagicLinkAsync, setUser } from '@/store/slices/authSlice'

export const useAuthHook = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  const handleLoginViaMagicLink = async (email: string) => {
    console.log('dispatching loginViaMagicLinkAsync', email)
    const res = await dispatch(loginViaMagicLinkAsync({ email }))
    console.log('dispatched loginViaMagicLinkAsync', res)

    if (loginViaMagicLinkAsync.fulfilled.match(res)) {
      dispatch(setUser(res.payload.user))
      console.log('loginViaMagicLinkAsync.fulfilled', res.payload.user)
    }
  }

  return {
    user,
    isLoading,
    error,
    handleLoginViaMagicLink,
  }
}

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session, User } from '@supabase/supabase-js'

import { loginViaMagicLink, logOut } from '@/db/auth.service'

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isLoadingOtp: boolean
  error: string | null
}

export const loginViaMagicLinkAsync = createAsyncThunk(
  'auth/loginViaMagicLink',
  async ({ email }: { email: string }) => {
    const { data } = await loginViaMagicLink(email)
    return { user: data?.user, session: data?.session }
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await logOut()
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    session: null,
    isLoading: false,
    error: null,
  } as AuthState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload
    },
    clearAuth: state => {
      state.user = null
      state.session = null
    },
  },
  extraReducers: builder => {
    builder
      /** LogIn Via Magic Link */
      .addCase(loginViaMagicLinkAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginViaMagicLinkAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(loginViaMagicLinkAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
      /** LogOut */
      .addCase(logoutAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logoutAsync.fulfilled, state => {
        state.isLoading = false
        state.user = null
        state.session = null
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
  },
})

export const { setUser, setSession, clearAuth } = authSlice.actions
export default authSlice.reducer

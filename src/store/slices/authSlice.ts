import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session, User } from '@supabase/supabase-js'

import { login, loginViaMagicLink, logOut, register } from '@/db/auth.service'
import { AuthState } from '@/types/Auth.interface'

/**
 * Sign up a new user with their email and password.
 **/
export const siginUpWithEmailAndPasswordAsync = createAsyncThunk(
  'auth/siginUpWithEmailAndPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await register(email, password)
    return { user: data?.user, session: data?.session }
  }
)

/**
 * Log in a user with their email and password.
 **/
export const loginViaEmailAndPasswordAsync = createAsyncThunk(
  'auth/loginViaEmailAndPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await login(email, password)
    return { user: data?.user, session: data?.session }
  }
)

// todo
export const loginViaMagicLinkAsync = createAsyncThunk(
  'auth/loginViaMagicLink',
  async ({ email }: { email: string }) => {
    const { data } = await loginViaMagicLink(email)
    return { user: data?.user, session: data?.session }
  }
)

/**
 * Log out the currently authenticated user.
 **/
export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await logOut()
})

/**
 * Update user metadata.
 **/
// export const updateUserInfoAsync = createAsyncThunk<
//   { user: User },
//   {
//     userId: string
//     userInfo: UserMetadataI
//   },
//   {
//     rejectValue: string
//   }
// >(
//   'auth/updateUserInfo',
//   async (
//     {
//       userId,
//       userInfo,
//     }: {
//       userId: string
//       userInfo: UserMetadataI
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const { data } = await updateUserMetadata(userId, userInfo)
//       setUser(data.user)
//       return { user: data.user }
//     } catch (error) {
//       if (error instanceof Error) return rejectWithValue(error.message)
//       return rejectWithValue('An unknown error occurred')
//     }
//   }
// )

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
      /** Sign Up Via Email And Password */
      .addCase(siginUpWithEmailAndPasswordAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(siginUpWithEmailAndPasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(siginUpWithEmailAndPasswordAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
      /** LogIn Via Email And Password */
      .addCase(loginViaEmailAndPasswordAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginViaEmailAndPasswordAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(loginViaEmailAndPasswordAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message as string
      })
      /** Update User Info */
      // .addCase(updateUserInfoAsync.pending, state => {
      //   state.isLoading = true
      //   state.error = null
      // })
      // .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.user = action.payload.user
      // })
      // .addCase(updateUserInfoAsync.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.error = action.payload as string
      // })
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

import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },

    devTools: true,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

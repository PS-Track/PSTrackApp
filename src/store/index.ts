import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import profileDialogReducer from './slices/profileDialogSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      profileDialog: profileDialogReducer,
    },

    devTools: true,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

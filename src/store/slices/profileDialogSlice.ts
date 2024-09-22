import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const profileDialogSlice = createSlice({
  name: 'profileDialog',
  initialState,
  reducers: {
    openProfileDialog: state => {
      state.isOpen = true
    },
    closeProfileDialog: state => {
      state.isOpen = false
    },
  },
})

export const { openProfileDialog, closeProfileDialog } = profileDialogSlice.actions
export default profileDialogSlice.reducer

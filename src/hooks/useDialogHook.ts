import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeProfileDialog, openProfileDialog } from '@/store/slices/profileDialogSlice'

export const useDialogHook = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector(state => state.profileDialog)

  return {
    isOpen,
    openDialog: () => dispatch(openProfileDialog()),
    closeDialog: () => dispatch(closeProfileDialog()),
  }
}

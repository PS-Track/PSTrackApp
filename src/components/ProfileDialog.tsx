import { z } from 'zod'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { firstLoginFormSchema } from '@/validation/firstLoginForm.schema'
import { useAuthHook } from '@/hooks/auth/useAuthHook'
import { useDialogHook } from '@/hooks/useDialogHook'

export default function ProfileDialog() {
  const { user, isLoading } = useAuthHook()
  const { isOpen, openDialog, closeDialog } = useDialogHook()
  const isEmailProvided = user?.app_metadata?.provider === 'email' || false

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof firstLoginFormSchema>>({
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: isEmailProvided ? user?.email : '', // todo test this
    },
  })

  function onSubmit(values: z.infer<typeof firstLoginFormSchema>) {
    // todo validate username is not used by other users
    console.log(values)
    console.log(user)

    closeDialog()
  }

  if (isLoading) return null // todo add loading spinner

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => (open ? openDialog() : closeDialog())}
    >
      <DialogContent
        className="border-[#27272a] bg-[#09090b] sm:max-w-[425px]"
        // Disable the autofocus and escape key down behaviors
        onCloseAutoFocus={event => event.preventDefault()}
        onEscapeKeyDown={event => event.preventDefault()}
        onPointerDownOutside={event => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Welcome to the PSTrack app 🎉</DialogTitle>
          <DialogDescription className="text-sm">
            {/*make it shorter*/}
            Please fill in your details to complete your profile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  className="col-span-3 border-[#27272a]"
                  {...register('first_name', { required: 'First name is required' })}
                />
                {errors.first_name && (
                  <span className="col-span-4 text-center text-sm text-red-500">
                    {errors.first_name.message}
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  className="col-span-3 border-[#27272a]"
                  {...register('last_name', { required: 'Last name is required' })}
                />
                {errors.last_name && (
                  <span className="col-span-4 text-center text-sm text-red-500">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>

            <div className="items-center gap-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="will be displayed on the table"
                className="col-span-3 border-[#27272a]"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <span className="col-span-4 text-center text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>

            {!isEmailProvided && (
              <div className="items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="col-span-3 border-[#27272a]"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && (
                  <span className="col-span-4 text-center text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
            )}

            {/* Add more fields */}
          </div>
          <DialogFooter>
            <Button type="submit">Done</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

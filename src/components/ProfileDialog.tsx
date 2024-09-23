import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuthHook } from '@/hooks/auth/useAuthHook'
import { useDialogHook } from '@/hooks/generic/useDialogHook'
import { firstLoginFormSchema } from '@/validation/firstLoginForm.schema'

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

export default function ProfileDialog() {
  const { user, isLoading, handleUpdateUserMetadata } = useAuthHook()
  const { isOpen } = useDialogHook()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof firstLoginFormSchema>>({
    resolver: zodResolver(firstLoginFormSchema),
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
    },
  })

  // Set the email value from the user object
  useEffect(() => {
    if (user?.user_metadata?.email) setValue('email', user.user_metadata.email)
  }, [user, setValue])

  async function onSubmit(values: z.infer<typeof firstLoginFormSchema>) {
    if (!user) return

    await handleUpdateUserMetadata(user.id, { ...values })
  }

  if (isLoading) return null // todo add loading spinner

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="border-[#27272a] bg-[#09090b] sm:max-w-[425px]"
        onCloseAutoFocus={event => event.preventDefault()}
        onEscapeKeyDown={event => event.preventDefault()}
        onPointerDownOutside={event => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Welcome to the PSTrack app 🎉</DialogTitle>
          <DialogDescription className="text-sm">
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
                placeholder="Will be displayed on the table"
                className="col-span-3 border-[#27272a]"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && (
                <span className="col-span-4 text-center text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
            </div>

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
          </div>

          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
            >
              Done
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { firstLoginFormSchema } from '@/validation/firstLoginForm.schema'

interface ProfileDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileDialog({ isOpen, onClose }: ProfileDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof firstLoginFormSchema>>({
    defaultValues: {
      username: '',
    },
  })

  function onSubmit(values: z.infer<typeof firstLoginFormSchema>) {
    // todo validate username is not used by other users
    console.log(values)
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent
        className="border-[#27272a] bg-[#09090b] sm:max-w-[425px]"
        // Disable the autofocus and escape key down behaviors
        onCloseAutoFocus={event => event.preventDefault()}
        onEscapeKeyDown={event => event.preventDefault()}
        onPointerDownOutside={event => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Continue setting up your profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right"
              >
                Username
              </Label>
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

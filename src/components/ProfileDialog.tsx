import { z } from 'zod'
import { useForm } from 'react-hook-form'
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCountryCodesHook } from '@/hooks/generic/useCountryCodesHook'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

export default function ProfileDialog() {
  const { user, isLoading, handleUpdateUserFirstLogin } = useAuthHook()
  const { countryCodes, isLoading: isLoadingCodes } = useCountryCodesHook()
  const { isOpen } = useDialogHook()

  const form = useForm<z.infer<typeof firstLoginFormSchema>>({
    resolver: zodResolver(firstLoginFormSchema),
    defaultValues: {
      username: '',
      display_name: '',
      phone: '',
      phoneCountryCode: '',
    },
  })

  async function onSubmit(values: z.infer<typeof firstLoginFormSchema>) {
    if (!user) return
    const { phoneCountryCode, phone, ...restValues } = values
    const formattedPhone = `${phoneCountryCode}${phone}`

    await handleUpdateUserFirstLogin(user.id, {
      ...restValues,
      phone: formattedPhone,
    })
  }

  if (isLoading) return null // todo add loading spinner

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={event => event.preventDefault()}
        onEscapeKeyDown={event => event.preventDefault()}
        onPointerDownOutside={event => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Welcome to the PSTrack app 🎉</DialogTitle>
          <DialogDescription>
            Please fill in your details to complete your profile.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your display name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Will be displayed on the table"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <div className="flex gap-3">
                <FormField
                  name="phoneCountryCode"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingCodes ? (
                          <SelectItem
                            value="loading"
                            disabled
                          >
                            Loading...
                          </SelectItem>
                        ) : (
                          countryCodes.map((code, index) => (
                            <SelectItem
                              key={index + code.value} // Use a unique key
                              value={code.value}
                            >
                              {code.label}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter phone number"
                        className="flex-1"
                      />
                    </FormControl>
                  )}
                />
              </div>
              <FormDescription>
                It must be the same number you used to join the community.
              </FormDescription>
              <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
            </FormItem>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
              >
                Done
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

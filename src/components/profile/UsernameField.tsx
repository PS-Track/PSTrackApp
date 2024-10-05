import { UseFormReturn } from 'react-hook-form'
import { ProfileFormSchema } from '@/validation/profileForm.schema'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function UsernameField({ form }: { form: UseFormReturn<ProfileFormSchema> }) {
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                className="pl-8"
              />
            </FormControl>
            <span className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 transform">
              @
            </span>
          </div>
          <FormDescription>
            This is your public username, it will be shown in your group table, You can only change
            this once every 30 days.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

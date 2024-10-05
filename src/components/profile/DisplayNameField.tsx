import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ProfileFormSchema } from '@/validation/profileForm.schema'

export default function DisplayNameField({ form }: { form: UseFormReturn<ProfileFormSchema> }) {
  return (
    <FormField
      control={form.control}
      name="displayName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Display name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

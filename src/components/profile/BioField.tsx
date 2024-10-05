import { UseFormReturn } from 'react-hook-form'
import { ProfileFormSchema } from '@/validation/profileForm.schema'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function BioField({ form }: { form: UseFormReturn<ProfileFormSchema> }) {
  return (
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

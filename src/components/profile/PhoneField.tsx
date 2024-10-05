import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { profileSchema } from '@/validation/profileForm.schema'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useCountryCodesHook } from '@/hooks/generic/useCountryCodesHook'

export default function PhoneField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof profileSchema>>
}) {
  const { countryCodes, isLoading } = useCountryCodesHook()

  return (
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
                {isLoading ? (
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
      <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
    </FormItem>
  )
}

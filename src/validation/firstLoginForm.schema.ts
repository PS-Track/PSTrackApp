import { z } from 'zod'

export const firstLoginFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
  display_name: z
    .string()
    .min(3, 'Display name must be at least 3 characters')
    .max(20, 'Display name must be at most 20 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  phoneCountryCode: z.string().min(1, 'Country code is required'),
})

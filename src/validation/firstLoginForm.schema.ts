import { z } from 'zod'

export const firstLoginFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
  first_name: z
    .string()
    .min(3, 'First name must be at least 3 characters')
    .max(20, 'First name must be at most 20 characters'),
  last_name: z
    .string()
    .min(3, 'Last name must be at least 3 characters')
    .max(20, 'Last name must be at most 20 characters'),
})

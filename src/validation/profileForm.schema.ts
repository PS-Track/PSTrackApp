import * as z from 'zod'

export const profileSchema = z.object({
  displayName: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  bio: z.string().max(160).optional(),
  twitter: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  website: z.string().url().optional(),
})

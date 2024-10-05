import * as z from 'zod'

const fileSchema = z
  .instanceof(File)
  .refine(file => file.size > 0, { message: 'File cannot be empty' })

export type ProfileFormSchema = z.infer<typeof profileSchema>

export const profileSchema = z.object({
  avatar: fileSchema.optional(),
  displayName: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  bio: z.string().max(160).optional(),
  twitter: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  website: z.string().url().optional(),
  phoneCountryCode: z.string().min(1).max(5).optional(),
})

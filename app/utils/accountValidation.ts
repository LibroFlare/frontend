import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(4),
})

export const signUpSchema = signInSchema.extend({
  username: z.string().min(1),
})

import { z } from 'zod'

export const UserSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  name: z.string().optional() // Nome é opcional
})

import { z } from 'zod'

export const authFormSchema = (type: string) => z.object({
  // sign up
  name: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  email: type === 'sign-in' ? z.string().optional() : z.email(),
  // both
  username: z.string().min(3),
  password: z.string().min(8),
})
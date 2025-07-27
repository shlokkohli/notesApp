import { z } from 'zod'

export const loginSchema = z.object({
    email : z.email({ pattern: z.regexes.email, message: "Please enter a valid email address" }),
    password : z.object()
})

export type loginInput = z.infer<typeof loginSchema>
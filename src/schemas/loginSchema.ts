import { z } from 'zod'

export const loginSchema = z.object({
    email : z.email({ pattern: z.regexes.email, message: "Please enter a valid email address" }),
    password : z.string().min(1, "Field cannot be empty")
})
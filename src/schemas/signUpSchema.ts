import { z } from 'zod'

export const signUpSchema = z.object({
    name : z.string(),
    email : z.email({ pattern: z.regexes.email, message: "Please enter a valid email address" }),
    password: z.string().min(6, "")
})

export type signUpInput = z.infer<typeof signUpSchema>

// use signUpInput exactly at those places where i need type safety
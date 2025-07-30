import { z } from 'zod'

export const signUpSchema = z.object({
    name : z.string().min(1, "Name cannot be empty"),
    email : z.email({ pattern: z.regexes.email, message: "Please enter a valid email address" }),
    password: z.string().min(6, "Password must be atleast 6 characters")
})
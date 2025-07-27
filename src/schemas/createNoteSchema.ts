import { z } from 'zod'

export const createNoteSchema = z.object({
    title : z.string(),
    content : z.string(),
}).refine(
    (data) => (data.title === "") && (data.content === ""),
    {
        error: "Either title or content is required",
        path: ["content"]
    }
)

// writing path means, the error will appear under that specific field
import { z } from "zod";

export const createPostSchema = z.object({
    title : z.string().min(3).max(100),
    amount : z.number().positive().int()
})

export const expenseSchema = z.object({
    id : z.number().int().positive(),
    title : z.string().min(3).max(100),
    amount : z.number().positive().int()
})

export type Expense = z.infer<typeof expenseSchema>
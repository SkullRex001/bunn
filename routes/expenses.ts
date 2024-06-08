import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { createPostSchema, expenseSchema } from "../validationTypes";
import type { Expense } from "../validationTypes";





export const expensesRoute = new Hono();

const fakeData: Expense[] = [
    {
        "id": 1,
        "title": "Office Supplies",
        "amount": 150
    },
    {
        "id": 2,
        "title": "Client Lunch",
        "amount": 75
    },
    {
        "id": 3,
        "title": "Software Subscription",
        "amount": 300
    },
    {
        "id": 4,
        "title": "Travel Expenses",
        "amount": 1200
    },
    {
        "id": 5,
        "title": "Conference Fees",
        "amount": 500
    }
]


const route = expensesRoute.get('/', (c) => {
    return c.json({
        fakeData
    })
}).post('/', zValidator("json", createPostSchema), async (c) => {

    const data = await c.req.valid("json");
    fakeData.push({ ...data, id: fakeData.length + 1 })
    return c.json(data)

}).get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeData.find((expense) => expense.id === id)

    if (!expense) {
        return c.notFound()
    }
    return c.json({ expense })

}).get("/total-spent", (c) => {
    const total = fakeData.reduce((acc, expense) => acc + expense.amount, 0)
    return c.json({ total })
});

export type AppType = typeof route
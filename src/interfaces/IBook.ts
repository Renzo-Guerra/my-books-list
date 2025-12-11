import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  author: z.string().min(1, "Author is required!"),
  state: z.enum(["read", "pending", "reading"], { error: "Book state must be 'read', 'pending' or 'reading'!" }),
  score:
    // If the user doesn't provide a value, it becomes a "" which later causes an error in (z.coerce.number())
    z.preprocess(val => (val === "" ? undefined : val),
      z.coerce.number()
        .min(1, "Min score is 1!")
        .max(10, "Max score is 10!").optional()),
});

export type Book = z.infer<typeof bookSchema>;

export type BookInput = z.input<typeof bookSchema>;
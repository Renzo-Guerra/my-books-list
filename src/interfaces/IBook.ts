import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  author: z.string().min(1, "Author is required!"),
  state: z.enum(["read", "to read", "reading"], { error: "Book state must be 'read', 'to read' or 'reading'!" }),
  beginReading:
    // If the user doesn't provide a value, it becomes a "" which later causes an error in (new Date(""))
    z.preprocess(val => (val === "" ? undefined : val),
      z.coerce.date()
        .max(new Date(), { message: "Date cannot be in the future." })
        .optional()),
  finishReading:
    // If the user doesn't provide a value, it becomes a "" which later causes an error in (new Date(""))
    z.preprocess(val => (val === "" ? undefined : val),
      z.coerce.date()
        .max(new Date(), { message: "Date cannot be in the future." })
        .optional()),
  score:
    // If the user doesn't provide a value, it becomes a "" which later causes an error in (z.coerce.number())
    z.preprocess(val => (val === "" ? undefined : val),
      z.coerce.number()
        .min(1, "Min score is 1!")
        .max(10, "Max score is 10!").optional()),
}).refine(book => {
  if (!book.beginReading || !book.finishReading) return true;

  return book.beginReading <= book.finishReading;
}, {
  error: "The 'begin date' must be before the 'end date'!",
  path: ["finishReading"],
});

export type Book = z.infer<typeof bookSchema>;
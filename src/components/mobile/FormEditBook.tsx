import { useForm, type SubmitHandler } from "react-hook-form";
import { bookSchema, type Book, type BookInput } from "../../interfaces";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface props {
  onSubmitHandler: (oldData: Book, newData: Book) => Promise<Book[]>;
  onCancelHandler: () => void,
  book: Book,
}

export const FormEditBook = ({ onCancelHandler, onSubmitHandler, book }: props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors } } = useForm<BookInput, any, Book>(
      {
        resolver: zodResolver(bookSchema),
        defaultValues: book || {
          title: "",
          author: "",
          state: "read",
          score: undefined,
        }
      });

  const bookState = watch("state");

  const _onSubmitHandler: SubmitHandler<Book> = async (data: Book) => {
    await toast.promise(
      onSubmitHandler(book, data),
      {
        loading: "Saving...",
        success: "Book saved successfully!",
        error: "Opps! Something went wrong, try again",
      },
    ).then(() => reset())
      .catch(err => console.log(err));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(_onSubmitHandler)}
        className="my-auto mx-auto max-w-md bg-white shadow-lg rounded-md px-6 py-8 space-y-2 border border-gray-100"
      >
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">📚 {book ? "Edit" : "Add"} book</h3>

        <div className="space-y-1">
          <label htmlFor="title" className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter the book title"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="author" className="block text-gray-700 font-medium">Author</label>
          <input
            type="text"
            id="author"
            {...register("author")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter the author name"
          />
          {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="state" className="block text-gray-700 font-medium">Current state</label>
          <select
            id="state"
            {...register("state")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="read">Read</option>
            <option value="reading">Reading</option>
            <option value="pending">Pending</option>
          </select>
          {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
        </div>

        {bookState === "read" && (
          <>
            <div className="space-y-1">
              <label htmlFor="score" className="block text-gray-700 font-medium">Score</label>
              <input
                type="text"
                {...register("score")}
                id="score"
                placeholder="Rate from 1 to 10"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {errors.score && <p className="text-sm text-red-500">{errors.score.message}</p>}
            </div>
          </>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            className="grow-1 mt-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 font-medium cursor-pointer"
            onClick={onCancelHandler}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="grow-1 mt-5 py-2.5 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 disabled:opacity-70 transition-colors cursor-pointer"
          >
            {isSubmitting ? (book ? "Updating..." : "Saving...") : (book ? "Update" : "Save")}
          </button>
        </div>
      </form>
    </>
  )
}
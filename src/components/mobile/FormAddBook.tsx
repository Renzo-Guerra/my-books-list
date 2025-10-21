import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { bookSchema, type Book } from "../../interfaces";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface props {
  onSubmitHandler: (data: Book) => Promise<any>;
}

export const FormAddBook = ({ onSubmitHandler }: props) => {
  const [bookState, setBookState] = useState<string>("read");
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<Book>({ resolver: zodResolver(bookSchema) });

  const _onSubmitHandler: SubmitHandler<Book> = async (data: Book) => {
    await toast.promise(
      onSubmitHandler(data),
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
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">📚 Add a Book</h3>

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
            onChange={(e) => setBookState(e.target.value)}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white font-medium mt-5 py-2.5 rounded-md hover:bg-blue-600 disabled:opacity-70 transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  )
}
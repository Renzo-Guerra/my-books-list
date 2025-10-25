import type { Book } from "../../interfaces";
import { colorForState } from "../../utils/Display";
import { FiTrash2 } from "react-icons/fi";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import { useBooksContext } from "../../context/BooksProvider";

export const BookRow = ({ book }: { book: Book }) => {
  const { title, author, state, score } = book;
  const [layer, setLayer] = useState(false);
  const { setBooks } = useBooksContext();

  const deleteRow = async (): Promise<Book[]> => {
    try {
      const data = localStorage.getItem("books");
      const currentBooks: Book[] = data ? JSON.parse(data) : [];
      const filtered: Book[] = currentBooks.filter(book => book.title !== title || book.author !== author || book.state !== state || book.score !== score);
      localStorage.setItem("books", JSON.stringify(filtered));
      setBooks(filtered);
      return filtered;
    } catch (error) {
      console.error(`Error al eliminar el libro: ${title}!`);
      throw error;
    }

  }

  const handleDelete = async () => {
    await toast.promise(
      deleteRow(),
      {
        loading: "Deleting...",
        success: "Book deleted successfully!",
        error: "Opps! Something went wrong, try again",
      }
    ).finally(() => setLayer(false));
  }



  return (
    <tr className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr_0.9fr] items-center px-4 py-2 border-b border-gray-100 hover:bg-gray-50 transition">
      <td className="truncate">{title}</td>
      <td className="truncate">{author}</td>
      <td className={`text-center font-medium ${colorForState(state)}`}>{state}</td>
      <td className="text-center">{score ?? "-"}</td>
      <td>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex gap-1 justify-center items-center p-1 cursor-pointer border rounded-sm bg-sky-800 text-white hover:bg-sky-600 transition-colors duration-200">
            <FaPenToSquare /> Edit
          </button>
          <button
            className="flex gap-1 justify-center items-center p-1 cursor-pointer border rounded-sm bg-red-800 text-white hover:bg-red-600 transition-colors duration-200"
            onClick={handleDelete}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      </td>
      {layer && (
        <div>
          <p>Are you sure you want to delete <strong>{title}</strong>?</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex gap-1 justify-center items-center p-1 cursor-pointer border rounded-sm bg-sky-800 text-white hover:bg-sky-600 transition-colors duration-200">
              Cancel
            </button>
            <button
              className="flex gap-1 justify-center items-center p-1 cursor-pointer border rounded-sm bg-red-800 text-white hover:bg-red-600 transition-colors duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </tr >
  )
}
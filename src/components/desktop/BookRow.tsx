import type { Book } from "../../interfaces";
import { colorForState } from "../../utils/Display";
import { FiTrash2 } from "react-icons/fi";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import { useBooksContext } from "../../context/BooksProvider";
import { createPortal } from "react-dom";
import { FormEditBook } from "../mobile/FormEditBook";

interface Props {
  book: Book,
  onSubmitHandler: (oldData: Book, newData: Book) => Promise<any>,
}

export const BookRow = ({ book, onSubmitHandler }: Props) => {
  const { title, author, state, score } = book;
  const [modalCancel, setModalCancel] = useState(false);
  const [modalEditBook, setModalEditBook] = useState(false);

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
    ).finally(() => setModalCancel(false));
  }

  const _onSubmitHandler = async (oldData: Book, newData: Book): Promise<any> => {
    onSubmitHandler(oldData, newData)
      .then(() => setModalEditBook(false));
  }

  return (
    <>
      <tr className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr_0.9fr] items-center px-4 py-2 border-b border-gray-100 hover:bg-gray-50 transition">
        <td className="truncate">{title}</td>
        <td className="truncate">{author}</td>
        <td className={`text-center font-medium ${colorForState(state)}`}>{state}</td>
        <td className="text-center">{score ?? "-"}</td>
        <td>
          <div className="grid grid-cols-2 gap-2">
            <button
              className="flex gap-1 justify-center items-center p-1 cursor-pointer border rounded-sm bg-sky-800 text-white hover:bg-sky-600 transition-colors duration-200"
              onClick={() => setModalEditBook(true)}
            >
              <FaPenToSquare /> Edit
            </button>
            <button
              className="flex gap-1 justify-center items-center p-1 cursor-pointer border rounded-sm bg-red-800 text-white hover:bg-red-600 transition-colors duration-200"
              onClick={() => setModalCancel(true)}
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </td>
      </tr >

      {modalEditBook && (
        createPortal(
          <div className="fixed inset-0 z-50 min-h-auto flex items-center justify-center backdrop-contrast-30 p-4">
            <FormEditBook
              onSubmitHandler={_onSubmitHandler}
              onCancelHandler={() => setModalEditBook(false)}
              book={book}
            />
          </div>,
          document.body)
      )}

      {modalCancel &&
        createPortal(
          <div
            className="fixed inset-0 z-50 min-h-auto flex items-center justify-center backdrop-contrast-30 p-4">
            <div
              className="flex flex-col bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full"
            >
              <h3 className="text-xl font-semibold text-gray-900 m-2">Delete "{book.title}"</h3>
              <p className="text-gray-600 mb-3">
                Are you sure you want to delete it?
              </p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 font-medium cursor-pointer"
                  onClick={() => setModalCancel(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 font-medium shadow-sm cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>

  )
}
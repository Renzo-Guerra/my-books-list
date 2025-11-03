import { IoIosAddCircleOutline } from "react-icons/io";
import { BookRow } from "../components/desktop/BookRow";
import { FormAddBook, Target } from "../components/mobile";
import { useBooksContext } from "../context/BooksProvider";
import type { SubmitHandler } from "react-hook-form";
import type { Book } from "../interfaces";
import { useState } from "react";


export const HomePage = () => {
  const { books, setBooks } = useBooksContext();
  const [modal, setModal] = useState(false);

  const onSubmitHandler: SubmitHandler<Book> = async (data: Book): Promise<Book[]> => {
    try {
      const currentBooks = localStorage.getItem("books");
      const books: Book[] = currentBooks ? JSON.parse(currentBooks) : [];
      books.push(data);
      localStorage.setItem("books", JSON.stringify(books));
      setModal(false);
      setBooks(books);
      return books;
    } catch (error) {
      console.error("Error al guardar el libro:", error);
      throw error;
    }
  }

  const handleThing = () => {
    console.log("anda");
    setModal(true);

  }

  return (
    <>
      <div className="w-full p-2 max-w-6xl mx-auto">
        {books && books.length > 0 ? (
          <>
            {/* Desktop UI */}
            <div>
              <div className="flex items-center justify-between px-3 mb-3">
                <h2>Books</h2>
                <div className="flex items-center justify-end gap-3 grow">
                  <h2>Want to add more?</h2>
                  <button
                    className="flex gap-1 justify-center items-center px-2 py-1 cursor-pointer rounded-sm bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                    onClick={handleThing}>
                    <IoIosAddCircleOutline /> Add
                  </button>
                </div>
              </div>
              <table className="hidden md:grid w-full text-sm text-left border border-gray-200 text-gray-700">
                <thead className="bg-gray-100 text-gray-900 font-semibold">
                  <tr className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr_0.9fr] px-4 py-2">
                    <th>Title</th>
                    <th>Author</th>
                    <th className="text-center">Current state</th>
                    <th className="text-center">Score</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <BookRow
                      key={index}
                      book={book}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile UI */}
            <div className="flex flex-col gap-3 md:hidden mt-3">
              {books.map((book, index) => (
                <Target book={book} key={index} />
              ))}
            </div>
            {/* modal */}
            {modal && (
              <div className="fixed inset-0 z-50 min-h-auto flex items-center justify-center backdrop-contrast-30 p-4">
                <FormAddBook onSubmitHandler={onSubmitHandler} onCancel={() => setModal(false)} />
              </div>
            )}
          </>
        ) : (
          <p>Whoops! It seems like there aren't any books saved</p>
        )}
      </div>
    </>
  )
}
import { IoIosAddCircleOutline } from "react-icons/io";
import { BookRow } from "../components/desktop/BookRow";
import { FormAddBook } from "../components/mobile";
import { useBooksContext } from "../context/BooksProvider";
import type { Book } from "../interfaces";
import { useState } from "react";


export const HomePage = () => {
  const { books, setBooks } = useBooksContext();
  const [modalAddBook, setModalAddBook] = useState(false);

  const onSubmitHandlerAddBook = async (data: Book): Promise<Book[]> => {
    try {
      const currentBooks = localStorage.getItem("books");
      const books: Book[] = currentBooks ? JSON.parse(currentBooks) : [];
      books.push(data);
      localStorage.setItem("books", JSON.stringify(books));
      setModalAddBook(false);
      setBooks(books);

      return books;
    } catch (error) {
      console.error("Error al guardar el libro:", error);
      throw error;
    }
  }

  const booksAreEqual = (book1: Book, book2: Book) => {
    return book1.title === book2.title &&
      book1.author === book2.author &&
      book1.state === book2.state &&
      book1.score === book2.score;
  }

  const onSubmitHandlerEditBook = async (oldData: Book, newData: Book): Promise<Book[]> => {
    try {
      const currentBooks = localStorage.getItem("books");
      const books: Book[] = currentBooks ? JSON.parse(currentBooks) : [];
      const index = books.findIndex(current => booksAreEqual(current, oldData));

      if (index !== -1) {
        books[index] = newData;
        localStorage.setItem("books", JSON.stringify(books));
        setBooks(books);
      }

      return books;
    } catch (error) {
      console.error("Error al guardar el libro:", error);
      throw error;
    }
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
                    onClick={() => setModalAddBook(true)}>
                    <IoIosAddCircleOutline /> Add
                  </button>
                </div>
              </div>
              {/* Mobile */}
              <div className="md:hidden">
                {books.map((book, index) => (
                  <BookRow
                    key={index}
                    book={book}
                    onSubmitHandler={onSubmitHandlerEditBook}
                  />
                ))}
              </div>
              {/* Mobile */}

              {/* Desktop */}
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
                      onSubmitHandler={onSubmitHandlerEditBook}
                    />
                  ))}
                </tbody>
              </table>
              {/* Desktop */}
            </div>
            {/* modal */}
            {modalAddBook && (
              <div className="fixed inset-0 z-50 min-h-auto flex items-center justify-center backdrop-contrast-30 p-4">
                <FormAddBook
                  onSubmitHandler={onSubmitHandlerAddBook}
                  onCancelHandler={() => setModalAddBook(false)} />
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              <div className="flex items-center justify-between px-3 mb-3">
                <h2>Books</h2>
                <div className="flex items-center justify-end gap-3 grow">
                  <h2>Want to add more?</h2>
                  <button
                    className="flex gap-1 justify-center items-center px-2 py-1 cursor-pointer rounded-sm bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
                    onClick={() => setModalAddBook(true)}>
                    <IoIosAddCircleOutline /> Add
                  </button>
                </div>
              </div>
            </div>
            <p>Whoops! It seems like there aren't any books saved</p>
            {/* modal */}
            {modalAddBook && (
              <div className="fixed inset-0 z-50 min-h-auto flex items-center justify-center backdrop-contrast-30 p-4">
                <FormAddBook
                  onSubmitHandler={onSubmitHandlerAddBook}
                  onCancelHandler={() => setModalAddBook(false)} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
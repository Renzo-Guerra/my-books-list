import { useEffect, useState } from "react";
import type { Book } from "../interfaces";
import { BookRow } from "../components/desktop/BookRow";
import { Target } from "../components/mobile";

const mockBooks: Book[] = [
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    state: "read",
    score: 9
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    state: "pending",
    score: undefined
  },
  {
    title: "Orgullo y prejuicio",
    author: "Jane Austen",
    state: "read",
    score: 8
  },
  {
    title: "Crimen y castigo",
    author: "Fiódor Dostoyevski",
    state: "reading",
    score: 7
  },
  {
    title: "1984",
    author: "George Orwell",
    state: "read",
    score: 10
  },
  {
    title: "En busca del tiempo perdido",
    author: "Marcel Proust",
    state: "reading",
    score: undefined
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    state: "read",
    score: 9
  },
  {
    title: "Los miserables",
    author: "Victor Hugo",
    state: "reading",
    score: undefined
  },
  {
    title: "El retrato de Dorian Gray",
    author: "Oscar Wilde",
    state: "read",
    score: 8
  },
  {
    title: "La Odisea",
    author: "Homero",
    state: "pending",
    score: undefined
  }
];

export const HomePage = () => {
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    const loadBooks = () => {
      const data = localStorage.getItem("books");
      setBooks(data ? JSON.parse(data) : []);
    }

    loadBooks();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "books") {
        loadBooks();
      }
    }
    // Updates books values (Just if "books" was updated)
    window.addEventListener("storage", handleStorageChange);

    return window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <div className="w-full p-2">
        {books && books.length > 0 ? (
          <>
            {/* Desktop UI */}
            <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-900 font-semibold">
                  <tr className="grid grid-cols-[2fr_1.5fr_1fr_0.5fr] px-4 py-2">
                    <th>Title</th>
                    <th>Author</th>
                    <th className="text-center">Current state</th>
                    <th className="text-center">Score</th>
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
          </>
        ) : (
          <p>Whoops! It seems like there aren't any books saved</p>
        )}
      </div>
    </>
  )
}
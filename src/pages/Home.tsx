import { useState } from "react";
import type { Book } from "../interfaces";
import { BookRow } from "../components/desktop/BookRow";
import { Target } from "../components/mobile";

const mockBooks: Book[] = [
  {
    title: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    beginReading: "2025-01-10",
    finishReading: "2025-02-05",
    state: "read",
    score: 9
  },
  {
    title: "Moby Dick",
    autor: "Herman Melville",
    beginReading: null,
    finishReading: null,
    state: "to read",
    score: null
  },
  {
    title: "Orgullo y prejuicio",
    autor: "Jane Austen",
    beginReading: "2025-02-15",
    finishReading: "2025-03-10",
    state: "read",
    score: 8
  },
  {
    title: "Crimen y castigo",
    autor: "Fiódor Dostoyevski",
    beginReading: "2025-04-01",
    finishReading: null,
    state: "reading",
    score: 7
  },
  {
    title: "1984",
    autor: "George Orwell",
    beginReading: "2025-05-12",
    finishReading: "2025-06-01",
    state: "read",
    score: 10
  },
  {
    title: "En busca del tiempo perdido",
    autor: "Marcel Proust",
    beginReading: "2025-06-10",
    finishReading: null,
    state: "reading",
    score: null
  },
  {
    title: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    beginReading: "2025-07-03",
    finishReading: "2025-07-20",
    state: "read",
    score: 9
  },
  {
    title: "Los miserables",
    autor: "Victor Hugo",
    beginReading: "2025-08-01",
    finishReading: null,
    state: "reading",
    score: null
  },
  {
    title: "El retrato de Dorian Gray",
    autor: "Oscar Wilde",
    beginReading: "2025-09-10",
    finishReading: "2025-09-25",
    state: "read",
    score: 8
  },
  {
    title: "La Odisea",
    autor: "Homero",
    beginReading: null,
    finishReading: null,
    state: "to read",
    score: null
  }
];

export const HomePage = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);

  return (
    <>
      <div className="w-full p-2">
        {/* Versión para pantallas grandes */}
        <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-900 font-semibold">
              <tr className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr_0.5fr] px-4 py-2 text-center">
                <th>Title</th>
                <th>Author</th>
                <th>Began reading</th>
                <th>Ended reading</th>
                <th>Current state</th>
                <th>Score</th>
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

        {/* Versión para móviles */}
        <div className="flex flex-col gap-3 md:hidden mt-3">
          {books.map((book, index) => (
            <Target book={book} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}
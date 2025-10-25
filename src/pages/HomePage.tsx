import { BookRow } from "../components/desktop/BookRow";
import { Target } from "../components/mobile";
import { useBooksContext } from "../context/BooksProvider";


export const HomePage = () => {
  const { books } = useBooksContext();

  return (
    <>
      <div className="w-full p-2 max-w-6xl mx-auto">
        {books && books.length > 0 ? (
          <>
            {/* Desktop UI */}
            <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
              <table className="w-full text-sm text-left text-gray-700">
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
          </>
        ) : (
          <p>Whoops! It seems like there aren't any books saved</p>
        )}
      </div>
    </>
  )
}
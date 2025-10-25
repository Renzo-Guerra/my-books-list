import { createContext, useContext, useEffect, useState } from "react";
import type { Book } from "../interfaces";

type BooksContextType = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

export const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

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
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
}

export const useBooksContext = (): BooksContextType => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooksContext must be use inside the BooksContext.provider!");
  }

  return context;
}
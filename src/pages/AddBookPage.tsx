import { type SubmitHandler } from "react-hook-form";
import { type Book } from "../interfaces";
import { FormAddBook } from "../components/mobile";

export const AddBookPage = () => {
  const onSubmitHandler: SubmitHandler<Book> = async (data: Book): Promise<Book[]> => {
    try {
      const currentBooks = localStorage.getItem("books");
      const books: Book[] = currentBooks ? JSON.parse(currentBooks) : [];
      books.push(data);
      localStorage.setItem("books", JSON.stringify(books));
      return books;
    } catch (error) {
      console.error("Error al guardar el libro:", error);
      throw error;
    }
  }

  return (
    <>
      <div
        className="grid align-center justify-center min-h-screen">
        <FormAddBook onSubmitHandler={onSubmitHandler} />
      </div>
    </>
  )
}
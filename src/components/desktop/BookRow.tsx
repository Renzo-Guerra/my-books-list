import type { Book } from "../../interfaces";
import { colorForState } from "../../utils/Display";


export const BookRow = ({ book }: { book: Book }) => {
  const { title, autor, beginReading, finishReading, state, score } = book;

  return (
    <tr className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr_0.5fr] px-4 py-2 border-b border-gray-100 hover:bg-gray-50 transition">
      <td className="truncate">{title}</td>
      <td className="truncate">{autor}</td>
      <td className="text-center">{beginReading ?? "-"}</td>
      <td className="text-center">{finishReading ?? "-"}</td>
      <td className={`text-center font-medium ${colorForState(state)}`}>{state}</td>
      <td className="text-center">{score ?? "-"}</td>
    </tr >
  )
}
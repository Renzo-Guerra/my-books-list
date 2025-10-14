import type { Book } from "../../interfaces"
import { colorForState } from "../../utils/Display";

export const Target = ({ book }: { book: Book }) => {
  const { title, autor, beginReading, finishReading, state, score } = book;
  return (
    <>
      <div
        className="bg-white rounded-2xl shadow p-4 border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{autor}</p>
        <div className="grid grid-cols-2 gap-1 text-sm">
          <p><span className="font-semibold">Began:</span> {beginReading ?? "-"}</p>
          <p><span className="font-semibold">Ended:</span> {finishReading ?? "-"}</p>
          <p><span className="font-semibold">State:</span> <span className={`${colorForState(state)}`}>{state}</span></p>
          <p><span className="font-semibold">Score:</span> {score ?? "-"}</p>
        </div>
      </div >
    </>
  )
}
export const colorForState = (state: string) => {
  return state === "read"
    ? "text-green-500"
    : state === "reading"
      ? "text-yellow-700"
      : "text-red-500";
}
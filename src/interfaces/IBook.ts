export interface Book {
  title: string;
  autor: string;
  beginReading?: string | null; // formato ISO: YYYY-MM-DD
  finishReading?: string | null;
  state: "read" | "to read" | "reading",
  score?: number | null; // From 1 to 10
}
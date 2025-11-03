import { HashRouter, Routes, Route } from "react-router-dom"
import { HomePage, NotFoundPage, } from "./pages"
import { Toaster } from "react-hot-toast"
import { BooksProvider } from "./context/BooksProvider"

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BooksProvider>
                <HomePage />
              </BooksProvider>
            } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App

import { HashRouter, Routes, Route } from "react-router-dom"
import { AddBookPage, HomePage, NotFoundPage, } from "./pages"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/add" element={<AddBookPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App

import { HashRouter, Routes, Route } from "react-router-dom"
import { HomePage, NotFoundPage } from "./pages"

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App

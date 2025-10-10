import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import AddNotePage from "./pages/AddNotePage"
import UpdateNotePage from "./pages/UpdateNotePage"
function App() {

  return (
    <div data-theme="forest">
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        {/* <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: { background: "#333", color: "#fff" },
              iconTheme: { primary: "#4ade80", secondary: "#333" },
            },
            error: {
              style: { background: "#1f2937", color: "#f87171" },
              iconTheme: { primary: "#ef4444", secondary: "#1f2937" },
            },
          }}
        /> */}

        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/add" element={<AddNotePage />} />
          <Route path="/edit/:id" element={<UpdateNotePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

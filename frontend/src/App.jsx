import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
function App() {

  return (
    <div data-theme="forest">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

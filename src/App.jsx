import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { auth } from './lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/login/LoginPage'
import AnalysisPage from './pages/AnalysisPage/AnalysisPage'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/Analysis" /> : <HomePage isDark={isDark} setIsDark={setIsDark}/>} />
        <Route path="/login" element={user ? <Navigate to="/Analysis" /> : <LoginPage/>}/>
        <Route path="/Analysis" element={user ? <AnalysisPage isDark={isDark} setIsDark={setIsDark} user={user}/> : <Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
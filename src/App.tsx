import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Submit from './pages/Submit'
import Success from './pages/Success'
import Review from './pages/Review'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/submit" element={<Submit />} />
      <Route path="/success" element={<Success />} />
      <Route path="/review/:id" element={<Review />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

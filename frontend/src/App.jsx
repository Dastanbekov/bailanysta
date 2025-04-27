import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Header from './components/header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import NotFound from './pages/NotFound'
import { AuthProvider, useAuth } from './context/AuthContext'

function Logout() {
  const { logout } = useAuth();
  logout();
  return <Navigate to="/login" replace />;
}

function ProtectedLayout() {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Защищённая зона */}
          <Route 
            path="/*"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          />

          {/* Открытые страницы - перенаправляют авторизованных пользователей на главную */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

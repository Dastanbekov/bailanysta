import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  // Пример простой навигации
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch(page) {
      case 'home':
        return <Home />
      case 'profile':
        return <Profile />
      case 'settings':
        return <Settings />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Header onNavChange={setPage} />
      <div className="content">
        <Sidebar onNavChange={setPage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App

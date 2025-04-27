import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

function Header() {
  const { user } = useAuth() || { user: null };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <h1>Bailanysta</h1>
        </Link>
      </div>
      
      <nav className="header-nav">
        <Link to="/">
          <i className="fas fa-home"></i>
          <span className="nav-text">Главная</span>
        </Link>
        <Link to="/profile">
          <i className="fas fa-user"></i>
          <span className="nav-text">Профиль</span>
        </Link>
        <Link to="/settings">
          <i className="fas fa-cog"></i>
          <span className="nav-text">Настройки</span>
        </Link>
        <ThemeToggle />
        <Link to="/logout" className="logout-link">
          <i className="fas fa-sign-out-alt"></i>
          <span className="nav-text">Выход</span>
        </Link>
      </nav>
    </header>
  )
}

export default Header

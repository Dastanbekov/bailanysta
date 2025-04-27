import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <h1>Моя Соцсеть</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/settings">Настройки</Link>
        <Link to="/logout">Выход</Link>
      </nav>
    </header>
  )
}

export default Header

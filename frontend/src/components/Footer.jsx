import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Главная</Link>
          <Link to="/profile">Профиль</Link>
          <Link to="/settings">Настройки</Link>
        </div>
        <p>© 2025 Bailanysta. Все права защищены.</p>
      </div>
    </footer>
  )
}

export default Footer

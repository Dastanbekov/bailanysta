import React from 'react'

function Header({ onNavChange }) {
  return (
    <header className="header">
      <h1>Моя Соцсеть</h1>
      <nav>
        <button onClick={() => onNavChange('home')}>Главная</button>
        <button onClick={() => onNavChange('profile')}>Профиль</button>
        <button onClick={() => onNavChange('settings')}>Настройки</button>
      </nav>
    </header>
  )
}

export default Header

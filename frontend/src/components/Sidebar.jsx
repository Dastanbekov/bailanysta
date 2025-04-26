
import React from 'react'

function Sidebar({ onNavChange }) {
  return (
    <aside className="sidebar">
      <ul>
        <li onClick={() => onNavChange('home')}>Лента новостей</li>
        <li onClick={() => onNavChange('profile')}>Мой профиль</li>
        <li onClick={() => onNavChange('settings')}>Параметры</li>
      </ul>
    </aside>
  )
}

export default Sidebar

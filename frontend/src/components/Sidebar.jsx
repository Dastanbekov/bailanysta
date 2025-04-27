import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { user } = useAuth() || { user: null };

  return (
    <aside className="sidebar">
      {user && (
        <div className="user-profile-summary">
          <div className="user-avatar">
            {/* Use default avatar placeholder */}
            <div className="avatar-placeholder"></div>
          </div>
          <h3 className="user-name">{user.displayName || 'Пользователь'}</h3>
        </div>
      )}
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-newspaper"></i>
              Лента новостей
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="fas fa-user-circle"></i>
              Мой профиль
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <i className="fas fa-sliders-h"></i>
              Параметры
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

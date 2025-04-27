import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { user } = useAuth() || {};
  
  useEffect(() => {
    console.log("User data in Sidebar:", user);
  }, [user]);

  return (
    <aside className="sidebar">
      {user && (
        <div className="user-profile-summary">
          <div className="user-avatar">
            {/* Use default avatar placeholder */}
            <div className="avatar-placeholder"></div>
          </div>
          <h3 className="user-name">{user.username || 'Пользователь'}</h3>
          <p className="user-id">ID: {user.userId}</p>
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

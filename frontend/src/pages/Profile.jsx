import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/profile/')
      setProfile(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Не удалось загрузить данные профиля')
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading-container">Загрузка профиля</div>
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="error-message">{error}</div>
        <button 
          className="auth-button" 
          onClick={fetchProfile}
          style={{ maxWidth: '200px', marginTop: '20px' }}
        >
          Попробовать снова
        </button>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>Профиль пользователя</h2>
        {user && <p className="username">@{profile.user.username}</p>}
      </div>

      {profile && (
        <div className="profile-content">
          <div className="profile-section">
            <h3>Основная информация</h3>
            <div className="profile-info">
              <p><strong>ID:</strong> {profile.id}</p>
              <p><strong>Имя:</strong> {profile.user.first_name}</p>
            </div>
          </div>

          <div className="profile-section">
            <h3>О себе</h3>
            <div className="profile-bio">
              {profile.short_bio ? (
                <p className="short-bio">{profile.short_bio}</p>
              ) : (
                <p className="no-info">Краткая информация не указана</p>
              )}
              
              {profile.bio ? (
                <p className="bio">{profile.bio}</p>
              ) : (
                <p className="no-info">Подробная информация не указана</p>
              )}
            </div>
          </div>

          <button 
            className="auth-button edit-profile-btn"
            onClick={() => {/* Implement edit functionality later */}}
          >
            Редактировать профиль
          </button>
        </div>
      )}
    </div>
  )
}

export default Profile

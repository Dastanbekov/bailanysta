import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import SkeletonLoader from '../components/SkeletonLoader'
import Post from '../components/Post'
import api from '../api'

function Profile() {
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [postsLoading, setPostsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [postsError, setPostsError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchProfile()
    fetchUserPosts()
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

  const fetchUserPosts = async () => {
    try {
      setPostsLoading(true)
      const response = await api.get('/api/posts/')
      setPosts(response.data)
      setPostsLoading(false)
    } catch (err) {
      console.error('Error fetching user posts:', err)
      setPostsError('Не удалось загрузить посты пользователя')
      setPostsLoading(false)
    }
  }

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/api/post-delete/${postId}`)
      setPosts(posts.filter(post => post.id !== postId))
    } catch (err) {
      console.error('Error deleting post:', err)
      setPostsError('Не удалось удалить пост')
    }
  }

  const handleUpdatePost = (updatedPost) => {
    // Update the post in the posts array
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  }

  if (loading) {
    return (
      <div className="profile-page">
        <SkeletonLoader type="profile" count={1} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
        <button 
          className="edit-profile-btn" 
          onClick={fetchProfile}
          style={{ maxWidth: '200px', marginTop: '20px' }}
        >
          <i className="fas fa-sync-alt"></i>
          <span>Попробовать снова</span>
        </button>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar"></div>
        <h2 className="section-heading">Профиль пользователя</h2>
        {user && <p className="username">@{profile.user.username}</p>}
        
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-count">{posts.length}</span>
            <span className="stat-label">Постов</span>
          </div>
          <div className="profile-stat">
            <span className="stat-count">0</span>
            <span className="stat-label">Подписчиков</span>
          </div>
          <div className="profile-stat">
            <span className="stat-count">0</span>
            <span className="stat-label">Подписок</span>
          </div>
        </div>
      </div>

      {profile && (
        <div className="profile-content">
          <div className="profile-section">
            <h3 className="section-heading">Основная информация</h3>
            <div className="profile-info">
              <p>
                <i className="fas fa-id-card"></i>
                <span><strong>ID:</strong> {profile.id}</span>
              </p>
              <p>
                <i className="fas fa-user"></i>
                <span><strong>Имя:</strong> {profile.user.first_name || 'Не указано'}</span>
              </p>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-heading">О себе</h3>
            <div className="profile-bio">
              {profile.short_bio ? (
                <p className="short-bio">{profile.short_bio}</p>
              ) : (
                <p className="no-info">
                  <i className="fas fa-info-circle"></i>
                  <span>Краткая информация не указана</span>
                </p>
              )}
              
              {profile.bio ? (
                <p className="bio">{profile.bio}</p>
              ) : (
                <p className="no-info">
                  <i className="fas fa-info-circle"></i>
                  <span>Подробная информация не указана</span>
                </p>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className="edit-profile-btn"
              onClick={() => {/* Implement edit functionality later */}}
            >
              <i className="fas fa-edit"></i>
              <span>Редактировать профиль</span>
            </button>
          </div>
        </div>
      )}

      {/* User Posts Section */}
      <div className="profile-posts-section">
        <h3 className="section-heading">
          <i className="fas fa-th"></i> Публикации пользователя
        </h3>
        
        {postsError && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i> {postsError}
          </div>
        )}
        
        {postsLoading ? (
          <SkeletonLoader type="post" count={2} />
        ) : posts.length === 0 ? (
          <div className="no-posts">
            <i className="fas fa-inbox"></i>
            <p>У пользователя пока нет публикаций</p>
          </div>
        ) : (
          <div className="profile-posts">
            {posts.map(post => (
              <Post 
                key={post.id} 
                post={post} 
                onDelete={handleDeletePost}
                onUpdate={handleUpdatePost}
                currentUser={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

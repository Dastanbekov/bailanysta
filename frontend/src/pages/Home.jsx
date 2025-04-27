import { useState, useEffect } from 'react'
import Post from '../components/Post'
import AIContentGenerator from '../components/AIContentGenerator'
import SkeletonLoader from '../components/SkeletonLoader'
import api from '../api'
import { useAuth } from '../context/AuthContext'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newPostContent, setNewPostContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/posts/?all_posts=true')
      setPosts(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Не удалось загрузить посты')
      setLoading(false)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    
    if (!newPostContent.trim()) return
    
    try {
      setSubmitting(true)
      const response = await api.post('/api/posts/', {
        content: newPostContent
      })
      
      // Add the new post to the beginning of the posts array
      setPosts([response.data, ...posts])
      setNewPostContent('')
      setSubmitting(false)
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Не удалось создать пост')
      setSubmitting(false)
    }
  }

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/api/post-delete/${postId}`)
      setPosts(posts.filter(post => post.id !== postId))
    } catch (err) {
      console.error('Error deleting post:', err)
      setError('Не удалось удалить пост')
    }
  }

  const handleUpdatePost = (updatedPost) => {
    // Update the post in the posts array
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  }

  const handleAIContentGenerated = (content) => {
    setNewPostContent(content);
  }

  if (loading) {
    return (
      <div className="home-page">
        <div className="create-post-container">
          <h2 className="section-heading">Создать пост</h2>
          <div className="skeleton-line" style={{ height: '100px', marginBottom: '1rem' }}></div>
          <div className="skeleton-line-medium" style={{ height: '40px' }}></div>
        </div>
        <SkeletonLoader type="post" count={3} />
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="create-post-container">
        <h2 className="section-heading">Создать пост</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleCreatePost}>
          <textarea
            className="post-textarea"
            placeholder="Что у вас нового?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            disabled={submitting}
          />
          <button 
            type="submit" 
            className="submit-post-btn"
            disabled={submitting || !newPostContent.trim()}
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Отправка...</span>
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                <span>Опубликовать</span>
              </>
            )}
          </button>
        </form>
      </div>

      <AIContentGenerator onContentGenerated={handleAIContentGenerated} />
      
      <div className="posts-container">
        <h2 className="section-heading">Публикации</h2>
        {posts.length === 0 ? (
          <p className="no-posts">Пока нет публикаций. Создайте новый пост выше!</p>
        ) : (
          posts.map(post => (
            <Post 
              key={post.id} 
              post={post} 
              onDelete={handleDeletePost}
              onUpdate={handleUpdatePost}
              currentUser={user}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Home

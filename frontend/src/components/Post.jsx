import { useState } from 'react'

function Post({ post, onDelete, currentUser }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { id, user, content, created_at, likes } = post
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    
    setLoading(true)
    await onDelete(id)
    setConfirmDelete(false)
    setLoading(false)
  }
  
  const cancelDelete = () => {
    setConfirmDelete(false)
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-author">
          <div className="post-author-avatar">
            {/* Avatar placeholder will be styled via CSS */}
          </div>
          <div className="post-author-info">
            <strong>{user.username}</strong>
            <div className="post-date">
              {created_at && formatDate(created_at)}
            </div>
          </div>
        </div>
        
        {currentUser && currentUser.userId === user.id && (
          <div className="post-menu">
            <button className="post-menu-btn">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        )}
      </div>
      
      <div className="post-content">
        {content}
      </div>
      
      <div className="post-actions">
        <button className="post-action-btn">
          <i className="far fa-heart"></i>
          <span>{likes && likes.length} Нравится</span>
        </button>
        
        <button className="post-action-btn">
          <i className="far fa-comment"></i>
          <span>Комментировать</span>
        </button>
        
        {currentUser && currentUser.userId === user.id && !confirmDelete ? (
          <button 
            className="post-action-btn text-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            <i className="far fa-trash-alt"></i>
            <span>Удалить</span>
          </button>
        ) : confirmDelete ? (
          <div className="confirm-delete">
            <span>Уверены?</span>
            <button 
              className="confirm-yes"
              onClick={handleDelete}
              disabled={loading}
            >
              <i className="fas fa-check"></i>
              <span>Да</span>
            </button>
            <button 
              className="confirm-no"
              onClick={cancelDelete}
              disabled={loading}
            >
              <i className="fas fa-times"></i>
              <span>Нет</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Post

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
          <strong>{user.username}</strong>
        </div>
        <div className="post-date">
          {created_at && formatDate(created_at)}
        </div>
      </div>
      
      <div className="post-content">
        {content}
      </div>
      
      <div className="post-footer">
        <div className="post-stats">
          <span className="post-likes">
            {likes && likes.length} лайков
          </span>
        </div>
        
        {currentUser && currentUser.userId === user.id && (
          <div className="post-actions">
            {!confirmDelete ? (
              <button 
                className="delete-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                Удалить
              </button>
            ) : (
              <div className="confirm-delete">
                <span>Уверены?</span>
                <button 
                  className="confirm-yes"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Да
                </button>
                <button 
                  className="confirm-no"
                  onClick={cancelDelete}
                  disabled={loading}
                >
                  Нет
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Post

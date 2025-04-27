import { useState } from 'react';

function Comment({ comment, currentUser, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { id, user, content, created_at , username } = comment;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    
    setLoading(true);
    if (onDelete) {
      await onDelete(id);
    }
    setConfirmDelete(false);
    setLoading(false);
  };
  
  const cancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-author">
          <div className="comment-author-avatar">
            {/* Avatar placeholder will be styled via CSS */}
          </div>
          <div className="comment-author-info">
            <strong>{username}</strong>
            <div className="comment-date">
              {created_at && formatDate(created_at)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="comment-content">
        {content}
      </div>
      
      {currentUser && currentUser.userId === user.id && !confirmDelete ? (
        <button 
          className="comment-action-btn text-danger"
          onClick={handleDelete}
          disabled={loading}
        >
          <i className="far fa-trash-alt"></i>
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
          </button>
          <button 
            className="confirm-no"
            onClick={cancelDelete}
            disabled={loading}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Comment; 
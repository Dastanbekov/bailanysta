import { useState, useEffect } from 'react'
import api from '../api'
import Comment from './Comment'

function Post({ post, onDelete, onUpdate, currentUser }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [postData, setPostData] = useState(post)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [commentSubmitting, setCommentSubmitting] = useState(false)
  
  const { id, user, content, created_at, likes } = postData
  
  // Update component when post prop changes
  useEffect(() => {
    setPostData(post);
  }, [post]);
  
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
  
  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const response = await api.get(`/api/posts/${id}/comments/`);
      setComments(response.data);
      setCommentsLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setCommentsLoading(false);
    }
  };
  
  const handleToggleComments = async () => {
    const newState = !showComments;
    setShowComments(newState);
    
    if (newState && comments.length === 0) {
      await fetchComments();
    }
  };
  
  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim() || !currentUser || commentSubmitting) return;
    
    try {
      setCommentSubmitting(true);
      const response = await api.post(`/api/posts/${id}/comments/`, {
        content: newComment
      });
      
      // Add the new comment to the comments array
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setCommentSubmitting(false);
    }
  };
  
  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/api/comments/${commentId}`);
      // Remove the deleted comment from the comments array
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

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
        <button 
          className="post-action-btn"
          disabled={!currentUser}
        >
          <i className="far fa-heart"></i>
          <span>{likes ? likes.length : 0} Нравится</span>
        </button>
        
        <button 
          className="post-action-btn"
          onClick={handleToggleComments}
        >
          <i className="far fa-comment"></i>
          <span>Комментарии {comments.length > 0 && `(${comments.length})`}</span>
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
      
      {showComments && (
        <div className="post-comments">
          <h4 className="comments-heading">Комментарии</h4>
          
          {currentUser && (
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                className="comment-textarea"
                placeholder="Напишите комментарий..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={commentSubmitting}
              />
              <button 
                type="submit"
                className="comment-submit-btn"
                disabled={commentSubmitting || !newComment.trim()}
              >
                {commentSubmitting ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-paper-plane"></i>
                )}
              </button>
            </form>
          )}
          
          {commentsLoading ? (
            <div className="comments-loading">
              <i className="fas fa-spinner fa-spin"></i>
              <span>Загрузка комментариев...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="no-comments">
              <i className="far fa-comment-alt"></i>
              <span>Нет комментариев</span>
            </div>
          ) : (
            <div className="comments-list">
              {comments.map(comment => (
                <Comment 
                  key={comment.id} 
                  comment={comment} 
                  currentUser={currentUser}
                  onDelete={handleDeleteComment}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Post

import React from 'react'

function Post({ author, content, date }) {
  return (
    <div className="post">
      <div className="post-header">
        <strong>{author}</strong>
        <span>{date}</span>
      </div>
      <p>{content}</p>
    </div>
  )
}

export default Post

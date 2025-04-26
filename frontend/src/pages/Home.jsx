import React from 'react'
import Post from '../components/Post'

function Home() {
  // Пример списка постов (можно заменить динамической загрузкой)
  const posts = [
    { id: 1, author: 'User1', content: 'Привет, мир!', date: '2025-04-26' },
    { id: 2, author: 'User2', content: 'Вау, отличная соцсеть!', date: '2025-04-25' }
  ]
  
  return (
    <div className="home-page">
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  )
}

export default Home

import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="loading-container">Loading...</div>
  }
  
  // If user is authenticated, redirect to home page
  return user ? <Navigate to="/" /> : children
}

export default PublicRoute 
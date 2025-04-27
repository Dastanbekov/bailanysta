import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { login, user } = useAuth()
	
	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user, navigate])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		if (!username || !password) {
			setError('Пожалуйста, заполните все поля')
			setLoading(false)
			return
		}

		try {
			const result = await login(username, password)
			
			if (result.success) {
				navigate('/')
			} else {
				setError(result.error)
				setLoading(false)
			}
		} catch (error) {
			console.error('Login error:', error)
			setError('Произошла ошибка при входе. Пожалуйста, попробуйте снова позже.')
			setLoading(false)
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-container">
				<h2>Вход в аккаунт</h2>
				
				{error && <div className="error-message">{error}</div>}
				
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Имя пользователя</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							disabled={loading}
						/>
					</div>
					
					<div className="form-group">
						<label htmlFor="password">Пароль</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={loading}
						/>
					</div>
					
					<button 
						type="submit" 
						className="auth-button"
						disabled={loading}
					>
						{loading ? 'Вход...' : 'Войти'}
					</button>
				</form>
				
				<div className="auth-footer">
					<p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
				</div>
			</div>
		</div>
	)
}

export default Login
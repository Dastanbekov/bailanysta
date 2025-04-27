import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	const [error, setError] = useState('')
	const [fieldErrors, setFieldErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { register, user } = useAuth()
	
	// Redirect if already logged in
	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user, navigate])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const validate = () => {
		const errors = {}
		
		if (!formData.username) errors.username = 'Имя пользователя обязательно'
		if (!formData.email) errors.email = 'Email обязателен'
		else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Некорректный email'
		
		if (!formData.password) errors.password = 'Пароль обязателен'
		else if (formData.password.length < 8) errors.password = 'Пароль должен содержать минимум 8 символов'
		
		if (formData.password !== formData.confirmPassword) {
			errors.confirmPassword = 'Пароли не совпадают'
		}
		
		return errors
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		// Reset errors
		setError('')
		setFieldErrors({})
		
		// Validate form
		const validationErrors = validate()
		if (Object.keys(validationErrors).length > 0) {
			setFieldErrors(validationErrors)
			return
		}
		
		setLoading(true)
		
		try {
			const userData = {
				username: formData.username,
				email: formData.email,
				password: formData.password
			}

			const result = await register(userData)
			
			if (result.success) {
				navigate('/')
			} else {
				if (typeof result.error === 'object') {
					// Handle field-specific errors from the backend
					if (result.error.username) {
						setFieldErrors(prev => ({ ...prev, username: result.error.username[0] }))
					}
					if (result.error.email) {
						setFieldErrors(prev => ({ ...prev, email: result.error.email[0] }))
					}
					if (result.error.password) {
						setFieldErrors(prev => ({ ...prev, password: result.error.password[0] }))
					}
					if (result.error.non_field_errors) {
						setError(result.error.non_field_errors[0])
					}
				} else {
					setError(result.error || 'Произошла ошибка при регистрации')
				}
				setLoading(false)
			}
		} catch (error) {
			console.error('Registration error:', error)
			setError('Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.')
			setLoading(false)
		}
	}

	return (
		<div className="auth-page">
			<div className="auth-container">
				<h2>Регистрация</h2>
				
				{error && <div className="error-message">{error}</div>}
				
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username">Имя пользователя</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							disabled={loading}
						/>
						{fieldErrors.username && <div className="field-error">{fieldErrors.username}</div>}
					</div>
					
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							disabled={loading}
						/>
						{fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
					</div>
					
					<div className="form-group">
						<label htmlFor="password">Пароль</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							disabled={loading}
						/>
						{fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
					</div>
					
					<div className="form-group">
						<label htmlFor="confirmPassword">Подтвердите пароль</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							disabled={loading}
						/>
						{fieldErrors.confirmPassword && <div className="field-error">{fieldErrors.confirmPassword}</div>}
					</div>
					
					<button 
						type="submit" 
						className="auth-button"
						disabled={loading}
					>
						{loading ? 'Регистрация...' : 'Зарегистрироваться'}
					</button>
				</form>
				
				<div className="auth-footer">
					<p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
				</div>
			</div>
		</div>
	)
}

export default Register
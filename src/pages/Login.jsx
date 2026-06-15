import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(email, password)
    setLoading(false)
    if (err) {
      setError('邮箱或密码错误，请重试。')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">⚗️</div>
          <div className="login-logo-title">Digital Chemistry Learning Hub</div>
          <div className="login-logo-sub">Imperial College London · MSc Digital Chemistry</div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label className="login-label" htmlFor="email">邮箱 Email</label>
            <input
              id="email"
              type="email"
              className="login-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="login-label" htmlFor="password">密码 Password</label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '登录中…' : '登录 Sign In'}
          </button>
        </form>
        <p className="login-hint">本网站为个人学习使用，无需注册。</p>
      </div>
    </div>
  )
}

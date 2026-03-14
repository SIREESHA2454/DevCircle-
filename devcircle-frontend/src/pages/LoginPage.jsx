import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import axios from 'axios'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', form)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    navigate('/feed')
  } catch (err) {
    setError(err.response?.data?.message || 'Invalid email or password!')
  } finally {
    setLoading(false)
  }
}
  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: 8, fontSize: 14,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
  }

  const labelStyle = {
    fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6, display: 'block'
  }

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', top: -150, left: -100, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', bottom: -100, right: -100, pointerEvents: 'none', zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Logo size="md" />
        </div>
      </nav>

      {/* FORM AREA */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h1 style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: 8 }}>
              Welcome back !
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Log in to your DevCircle account
            </p>
          </div>

          {/* Card */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '32px' }}>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#fca5a5' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email</label>
                <input
                  name="email" type="email" value={form.email}
                  onChange={handleChange} placeholder="example@gmail.com"
                  style={inputStyle} required
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Password</label>
                <input
                  name="password" type="password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password"
                  style={inputStyle} required
                />
              </div>

              {/* Forgot password */}
              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <span 
  onClick={() => alert('Please contact support@devcircle.dev')} 
  style={{ fontSize: 12, color: '#a5b4fc', cursor: 'pointer' }}>
  Forgot password?
</span>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 0 24px rgba(99,102,241,0.3)', transition: 'all 0.2s' }}>
                {loading ? 'Logging in...' : 'Log In '}
              </button>

            </form>
            
            <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 16 }}>
              By logging in, you agree to our{' '}
              <span onClick={() => navigate('/terms')} style={{ color: '#a5b4fc', cursor: 'pointer' }}>
  Terms of Service
</span>
            </p>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </div>


             {/* Signup link */}
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 20 }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} style={{ color: '#a5b4fc', cursor: 'pointer', fontWeight: 500 }}>
              Sign up free 
            </span>
          </p>

          </div>

         

        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import axios from 'axios'

export default function SignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', password: '', branch: '', year: '', skills: ''
  })
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
    const response = await axios.post('http://localhost:5000/api/auth/signup', form)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    navigate('/feed')
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong!')
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
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', top: -150, right: -100, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', bottom: -100, left: -100, pointerEvents: 'none', zIndex: 0 }} />

   {/* NAVBAR */}
      <nav style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Logo size="md" />
        </div>
      </nav>

      {/* FORM AREA */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h1 style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: 8 }}>
              Create your account
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Join thousands of student developers on DevCircle
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

              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@gmail.com" style={inputStyle} required />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" style={inputStyle} required />
              </div>

              {/* Branch + Year */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Branch</label>
                  <select name="branch" value={form.branch} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }} required>
                    <option value="" style={{ background: '#0D0F16' }}>Select branch</option>
                    <option value="CSE" style={{ background: '#0D0F16' }}>CSE</option>
                    <option value="ECE" style={{ background: '#0D0F16' }}>ECE</option>
                    <option value="EEE" style={{ background: '#0D0F16' }}>EEE</option>
                    <option value="MECH" style={{ background: '#0D0F16' }}>Mechanical</option>
                    <option value="CIVIL" style={{ background: '#0D0F16' }}>Civil</option>
                    <option value="IT" style={{ background: '#0D0F16' }}>IT</option>
                    <option value="OTHER" style={{ background: '#0D0F16' }}>Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Year</label>
                  <select name="year" value={form.year} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }} required>
                    <option value="" style={{ background: '#0D0F16' }}>Select year</option>
                    <option value="1" style={{ background: '#0D0F16' }}>1st Year</option>
                    <option value="2" style={{ background: '#0D0F16' }}>2nd Year</option>
                    <option value="3" style={{ background: '#0D0F16' }}>3rd Year</option>
                    <option value="4" style={{ background: '#0D0F16' }}>4th Year</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Skills <span style={{ color: 'rgba(255,255,255,0.25)' }}>(comma separated)</span></label>
                <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, Python, MongoDB..." style={inputStyle} />
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 0 24px rgba(99,102,241,0.3)', transition: 'all 0.2s' }}>
                {loading ? 'Creating account...' : 'Create Account '}
              </button>

            </form>

            <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 16 }}>
              By signing up, you agree to our{' '}
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

           

          
        {/* Login link */}
          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 20 }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: '#a5b4fc', cursor: 'pointer', fontWeight: 500 }}>
              Log in 
            </span>
          </p>
          </div>

        </div>
      </div>
    </div>
  )
}
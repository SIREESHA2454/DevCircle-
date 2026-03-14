import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/Logo'

export default function PostProjectPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', description: '', githubLink: '', liveLink: '', techStack: ''
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
      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:5000/api/projects',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
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
        <div onClick={() => navigate('/feed')} style={{ cursor: 'pointer' }}>
          <Logo size="md" />
        </div>
        <button onClick={() => navigate('/feed')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Back to Feed
        </button>
      </nav>

      {/* FORM */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h1 style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: 8 }}>
              Share your project
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              Showcase what you built and find collaborators
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

              {/* Title */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Project Title</label>
                <input
                  name="title" value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. AI Resume Reviewer"
                  style={inputStyle} required
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  name="description" value={form.description}
                  onChange={handleChange}
                  placeholder="What does your project do? What problem does it solve?"
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  required
                />
              </div>

              {/* GitHub + Live Link */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>GitHub Link</label>
                  <input
                    name="githubLink" value={form.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Live Link <span style={{ color: 'rgba(255,255,255,0.25)' }}>(optional)</span></label>
                  <input
                    name="liveLink" value={form.liveLink}
                    onChange={handleChange}
                    placeholder="https://myproject.vercel.app"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Tech Stack <span style={{ color: 'rgba(255,255,255,0.25)' }}>(comma separated)</span></label>
                <input
                  name="techStack" value={form.techStack}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, Tailwind..."
                  style={inputStyle}
                />
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                style={{ width: '100%', padding: '12px', background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', boxShadow: '0 0 24px rgba(99,102,241,0.3)', transition: 'all 0.2s' }}>
                {loading ? 'Posting...' : 'Post Project →'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
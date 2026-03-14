import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/Logo'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: '', bio: '', skills: '', branch: '', year: ''
  })
  const [saving, setSaving] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${user._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setProfile(response.data.user)
      setProjects(response.data.projects)
      setForm({
        name: response.data.user.name || '',
        bio: response.data.user.bio || '',
        skills: response.data.user.skills?.join(', ') || '',
        branch: response.data.user.branch || '',
        year: response.data.user.year || ''
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await axios.put(
        'http://localhost:5000/api/users/update',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setProfile(response.data.user)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setEditing(false)
    } catch (error) {
      console.log(error)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 14,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
  }

  if (loading) return (
    <div style={{ background: '#080A0F', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'system-ui' }}>Loading profile...</p>
    </div>
  )

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: -150, left: -100, pointerEvents: 'none', zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,10,15,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <Logo size="md" />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => navigate('/feed')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
              ← Feed
            </button>
            <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', padding: '7px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px', position: 'relative', zIndex: 1 }}>

        {/* PROFILE CARD */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '36px', marginBottom: 32 }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* Avatar */}
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                {profile?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                {editing ? (
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ ...inputStyle, fontSize: 22, fontWeight: 600, marginBottom: 8, width: 250 }}
                  />
                ) : (
                  <h1 style={{ fontSize: 24, fontWeight: 600, color: '#fff', marginBottom: 4, letterSpacing: '-0.5px' }}>
                    {profile?.name}
                  </h1>
                )}
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  {profile?.branch} · Year {profile?.year} · {profile?.email}
                </p>
              </div>
            </div>

            {/* Edit / Save button */}
            <div style={{ display: 'flex', gap: 8 }}>
              {editing ? (
                <>
                  <button onClick={() => setEditing(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button onClick={() => setEditing(true)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Bio</p>
            {editing ? (
              <textarea
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                placeholder="Tell people about yourself..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            ) : (
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                {profile?.bio || 'No bio yet — click Edit Profile to add one!'}
              </p>
            )}
          </div>

          {/* Branch + Year (editing) */}
          {editing && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Branch</p>
                <select value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="" style={{ background: '#0D0F16' }}>Select branch</option>
                  <option value="CSE" style={{ background: '#0D0F16' }}>CSE</option>
                  <option value="ECE" style={{ background: '#0D0F16' }}>ECE</option>
                  <option value="EEE" style={{ background: '#0D0F16' }}>EEE</option>
                  <option value="MECH" style={{ background: '#0D0F16' }}>Mechanical</option>
                  <option value="IT" style={{ background: '#0D0F16' }}>IT</option>
                  <option value="OTHER" style={{ background: '#0D0F16' }}>Other</option>
                </select>
              </div>
              <div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Year</p>
                <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="" style={{ background: '#0D0F16' }}>Select year</option>
                  <option value="1" style={{ background: '#0D0F16' }}>1st Year</option>
                  <option value="2" style={{ background: '#0D0F16' }}>2nd Year</option>
                  <option value="3" style={{ background: '#0D0F16' }}>3rd Year</option>
                  <option value="4" style={{ background: '#0D0F16' }}>4th Year</option>
                </select>
              </div>
            </div>
          )}

          {/* Skills */}
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Skills</p>
            {editing ? (
              <input
                value={form.skills}
                onChange={e => setForm({ ...form, skills: e.target.value })}
                placeholder="React, Node.js, Python..."
                style={inputStyle}
              />
            ) : (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {profile?.skills?.length > 0 ? profile.skills.map((skill, i) => (
                  <span key={i} style={{ fontSize: 12, background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', padding: '4px 12px', borderRadius: 8, border: '1px solid rgba(99,102,241,0.2)' }}>
                    {skill}
                  </span>
                )) : (
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>No skills added yet</p>
                )}
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#fff' }}>{projects.length}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Projects</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 600, color: '#fff' }}>{profile?.connections?.length || 0}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Connections</div>
            </div>
          </div>
        </div>

        {/* MY PROJECTS */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', letterSpacing: '-0.5px', marginBottom: 20 }}>
            My Projects
          </h2>

          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>No projects yet</p>
              <button onClick={() => navigate('/post-project')} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '9px 20px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                Post Your First Project
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {projects.map((project) => (
                <div key={project._id} onClick={() => navigate(`/project/${project._id}`)}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 20, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{project.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
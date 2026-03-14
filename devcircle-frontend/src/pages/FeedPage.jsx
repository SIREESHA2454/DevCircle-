import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/Logo'
import { useSocket } from '../context/SocketContext'

export default function FeedPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user'))
  const { notifications, unreadCount, clearNotifications,setNotifications } = useSocket()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects')
      setProjects(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: -200, left: -200, pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', bottom: -100, right: -100, pointerEvents: 'none', zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(8,10,15,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 40px'
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 64
        }}>

          {/* LEFT */}
          <Logo size="md" />

          {/* CENTER NAV LINKS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => navigate('/dashboard')} style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)',
              padding: '7px 16px',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer'
            }}>
              Dashboard
            </button>

            <button onClick={() => navigate('/feed')} style={{
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#a5b4fc',
              padding: '7px 16px',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer'
            }}>
              Feed
            </button>

            <button onClick={() => navigate('/search')} style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)',
              padding: '7px 16px',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer'
            }}>
              Search
            </button>

            <button onClick={() => navigate('/hackathons')} style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)',
              padding: '7px 16px',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer'
            }}>
              Hackathons
            </button>
          </div>

          {/* Notification Bell */}
<div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => {
  setNotifications([])  // clear notifications when clicked
  navigate('/dashboard')
}}>
  <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => {
  clearNotifications()
  navigate('/dashboard')
}}>
  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
    🔔
  </div>
  {unreadCount > 0 && (
    <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>
      {unreadCount}
    </div>
  )}
</div>
  {notifications.length > 0 && (
    <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: '#6366f1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700 }}>
      {notifications.length}
    </div>
  )}
</div>

          {/* RIGHT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate('/post-project')} style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              border: 'none',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              + Post Project
            </button>

            <div onClick={() => navigate('/profile')} style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              cursor: 'pointer'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <button onClick={handleLogout} style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.4)',
              padding: '7px 14px',
              borderRadius: 8,
              fontSize: 12,
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: 6 }}>
              Hey {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
              Discover what fellow developers are building
            </p>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            {projects.length} projects
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
              Loading projects...
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
              No projects yet!
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
              Be the first to showcase your project
            </p>
            <button onClick={() => navigate('/post-project')} style={{
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              border: 'none',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: 8,
              fontSize: 14,
              cursor: 'pointer'
            }}>
              Post First Project
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && projects.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20
          }}>
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/project/${project._id}`)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '1px solid rgba(99,102,241,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >

                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                ) : (
                  <div style={{
                    width: '100%',
                    height: 180,
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 40
                  }}>
                    🧑‍💻
                  </div>
                )}

                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                    {project.title}
                  </h3>

                  <p style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.6,
                    marginBottom: 14
                  }}>
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} style={{
                        fontSize: 11,
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.5)',
                        padding: '3px 9px',
                        borderRadius: 6,
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
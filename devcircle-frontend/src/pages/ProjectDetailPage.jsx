import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Logo from '../components/Logo'

export default function ProjectDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetchProject()
  }, [])

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${id}`)
      setProject(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const [requestSent, setRequestSent] = useState(false)

const handleCollabRequest = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.post(
      'http://localhost:5000/api/collab/send',
      { projectId: id, message: 'Hey! I would love to collaborate on this project.' },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setRequestSent(true)
  } catch (err) {
    if (err.response?.data?.message === 'Request already sent!') {
      setRequestSent(true)
    }
    console.log(err)
  }
}
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/feed')
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return (
    <div style={{ background: '#080A0F', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'system-ui' }}>Loading project...</p>
    </div>
  )

  if (!project) return (
    <div style={{ background: '#080A0F', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'system-ui' }}>Project not found</p>
    </div>
  )

  const isOwner = user?._id === project.postedBy?._id

  return (
    <div style={{ background: '#080A0F', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'fixed', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: -150, right: -100, pointerEvents: 'none', zIndex: 0 }} />

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(8,10,15,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
          <Logo size="md" />
          <button onClick={() => navigate('/feed')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
            ← Back to Feed
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 32px', position: 'relative', zIndex: 1 }}>

        {/* Project Image */}
        {project.image ? (
          <img src={project.image} alt={project.title} style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 16, marginBottom: 32, border: '1px solid rgba(255,255,255,0.07)' }} />
        ) : (
          <div style={{ width: '100%', height: 240, background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))', borderRadius: 16, marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, border: '1px solid rgba(255,255,255,0.07)' }}>
            🧑‍💻
          </div>
        )}

        {/* Title + Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <h1 style={{ fontSize: 32, fontWeight: 600, color: '#fff', letterSpacing: '-1.2px', lineHeight: 1.2 }}>
            {project.title}
          </h1>
          {isOwner && (
            <button onClick={handleDelete} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', marginLeft: 16 }}>
              Delete Project
            </button>
          )}
        </div>

        {/* Description */}
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 28 }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Tech Stack</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.techStack.map((tech, i) => (
              <span key={i} style={{ fontSize: 13, background: 'rgba(99,102,241,0.1)', color: '#a5b4fc', padding: '5px 12px', borderRadius: 8, border: '1px solid rgba(99,102,241,0.2)' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {(project.githubLink || project.liveLink) && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '9px 18px', borderRadius: 8, fontSize: 13, textDecoration: 'none' }}>
                GitHub →
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', border: 'none', color: '#fff', padding: '9px 18px', borderRadius: 8, fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
                Live Demo →
              </a>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 28 }} />

        {/* Posted By */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, color: '#fff' }}>
              {project.postedBy?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{project.postedBy?.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                {project.postedBy?.branch} · Year {project.postedBy?.year}
              </div>
              {project.postedBy?.skills?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  {project.postedBy.skills.slice(0, 4).map((skill, i) => (
                    <span key={i} style={{ fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Collab button — only show if not owner */}
         {!isOwner && (
  <button
    onClick={handleCollabRequest}
    disabled={requestSent}
    style={{
      background: requestSent ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      border: requestSent ? '1px solid rgba(16,185,129,0.2)' : 'none',
      color: requestSent ? '#6ee7b7' : '#fff',
      padding: '10px 20px', borderRadius: 10, fontSize: 14,
      fontWeight: 500, cursor: requestSent ? 'default' : 'pointer',
      fontFamily: 'inherit', boxShadow: requestSent ? 'none' : '0 0 20px rgba(99,102,241,0.3)'
    }}>
    {requestSent ? 'Request Sent ✓' : 'Request Collaboration 🤝'}
  </button>
)}
        </div>

      </div>
    </div>
  )
}
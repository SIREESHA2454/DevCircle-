import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [toast, setToast] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!user) return

    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)
    newSocket.emit('join', user._id)

    newSocket.on('notification', (data) => {
      setNotifications(prev => [data, ...prev])
      setUnreadCount(prev => prev + 1)
      // show toast
      setToast(data.message)
      setTimeout(() => setToast(null), 4000)
    })

    return () => newSocket.close()
  }, [])

  const clearNotifications = () => {
    setUnreadCount(0)
    setNotifications([])
  }

  return (
    <SocketContext.Provider value={{ socket, notifications, unreadCount, clearNotifications }}>
      {/* Global Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.95), rgba(139,92,246,0.95))',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 12, padding: '14px 20px',
          color: '#fff', fontSize: 14, fontWeight: 500,
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
          maxWidth: 320,
          animation: 'slideIn 0.3s ease'
        }}>
          🔔 {toast}
        </div>
      )}
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
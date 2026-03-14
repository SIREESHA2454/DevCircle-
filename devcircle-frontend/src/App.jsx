import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import TermsPage from './pages/TermsPage'
import FeedPage from './pages/FeedPage'
import ProtectedRoute from './components/ProtectedRoute'
import PostProjectPage from './pages/PostProjectPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import HackathonPage from './pages/HackathonPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/feed" element={
          <ProtectedRoute>
            <FeedPage />
          </ProtectedRoute>
        } />

        <Route path="/post-project" element={
  <ProtectedRoute>
    <PostProjectPage />
  </ProtectedRoute>
} />
     <Route path="/project/:id" element={
  <ProtectedRoute>
    <ProjectDetailPage />
  </ProtectedRoute>
} />
   <Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
    <Route path="/search" element={
  <ProtectedRoute>
    <SearchPage />
  </ProtectedRoute>
} />
<Route path="/hackathons" element={
  <ProtectedRoute>
    <HackathonPage />
  </ProtectedRoute>
} />
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
<Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
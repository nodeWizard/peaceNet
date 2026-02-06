import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { CommunitySpace } from './pages/CommunitySpace';
import { EducationalHub } from './pages/EducationalHub';
import { AISupportAgent } from './pages/AISupportAgent';
import { ExpertConsultation } from './pages/ExpertConsultation';
import { BrowserExtensionPage } from './pages/BrowserExtensionPage';
import { ProfileSettings } from './pages/ProfileSettings';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="community" element={<CommunitySpace />} />
          <Route path="education" element={<EducationalHub />} />
          <Route path="ai-support" element={<AISupportAgent />} />
          <Route path="experts" element={<ExpertConsultation />} />
          <Route path="extension" element={<BrowserExtensionPage />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

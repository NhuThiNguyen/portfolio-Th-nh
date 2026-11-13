import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AdminEducationPage } from './pages/admin/AdminEducationPage';
import { AdminSkillsPage } from './pages/admin/AdminSkillsPage';
import { AdminToolsPage } from './pages/admin/AdminToolsPage';
import { AdminCertificatesPage } from './pages/admin/AdminCertificatesPage';
import { AdminInterestsPage } from './pages/admin/AdminInterestsPage';
import { AdminPostsPage } from './pages/admin/AdminPostsPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminAlbumsPage } from './pages/admin/AdminAlbumsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio */}
          <Route path="/" element={<HomePage />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Dashboard & CMS */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
            <Route path="education" element={<AdminEducationPage />} />
            <Route path="skills" element={<AdminSkillsPage />} />
            <Route path="tools" element={<AdminToolsPage />} />
            <Route path="certificates" element={<AdminCertificatesPage />} />
            <Route path="interests" element={<AdminInterestsPage />} />
            <Route path="posts" element={<AdminPostsPage />} />
            <Route path="media" element={<AdminMediaPage />} />
            <Route path="albums" element={<AdminAlbumsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

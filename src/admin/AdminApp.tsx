import { Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from './AdminAuthContext';
import { RequireAdminAuth } from './RequireAdminAuth';
import { AdminLayout } from './AdminLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProjectsList } from './pages/ProjectsList';
import { ProjectForm } from './pages/ProjectForm';
import { Messages } from './pages/Messages';
import { SiteSettingsPage } from './pages/SiteSettingsPage';
import { SocialLinksPage } from './pages/SocialLinksPage';

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="*"
          element={
            <RequireAdminAuth>
              <AdminLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="projects" element={<ProjectsList />} />
                  <Route path="projects/new" element={<ProjectForm />} />
                  <Route path="projects/:id/edit" element={<ProjectForm />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="social-links" element={<SocialLinksPage />} />
                  <Route path="settings" element={<SiteSettingsPage />} />
                </Routes>
              </AdminLayout>
            </RequireAdminAuth>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
}
